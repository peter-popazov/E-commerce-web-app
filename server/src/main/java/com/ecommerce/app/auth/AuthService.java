package com.ecommerce.app.auth;

import com.ecommerce.app.auth.dto.LoginBody;
import com.ecommerce.app.auth.dto.LoginResponse;
import com.ecommerce.app.auth.dto.RegisterResponse;
import com.ecommerce.app.auth.dto.RegistrationBody;
import com.ecommerce.app.email.EmailService;
import com.ecommerce.app.email.EmailTemplateName;
import com.ecommerce.app.handler.InvalidToken;
import com.ecommerce.app.security.JWTService;
import com.ecommerce.app.user.AppUser;
import com.ecommerce.app.model.Token;
import com.ecommerce.app.user.AppUserDAO;
import com.ecommerce.app.model.dao.RoleDAO;
import com.ecommerce.app.model.dao.TokenDAO;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AppUserDAO appUserDAO;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleDAO roleDAO;
    private final TokenDAO tokenDAO;
    private final EmailService emailService;

    @Value("${mailing.url}")
    private String activationUrl;

    @Value("${activation-code-length}")
    private int activationCodeLength;

    public RegisterResponse register(RegistrationBody registrationBody) throws MessagingException {
        var userRole = roleDAO.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("Role [USER] not found"));

        var appUser = AppUser.builder()
                .username(registrationBody.getUsername())
                .password(passwordEncoder.encode(registrationBody.getPassword()))
                .email(registrationBody.getEmail())
                .firstName(registrationBody.getFirstName())
                .lastName(registrationBody.getLastName())
                .roles(List.of(userRole))
                .build();

        appUserDAO.save(appUser);
        sendValidationEmail(appUser);

        var jwtToken = jwtService.generateToken(appUser);
        return RegisterResponse.builder().accessToken(jwtToken).build();
    }

    private void sendValidationEmail(AppUser appUser) throws MessagingException {
        var newToken = generateAndSaveActivationToken(appUser);

        emailService.sendEmail(
                appUser.getEmail(),
                appUser.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(AppUser appUser) {

        String generatedToken = generateActivationCode(activationCodeLength);
        var token = Token
                .builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(10))
                .user(appUser)
                .build();

        tokenDAO.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String chars = "0123456789";
        StringBuilder activationCode = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(chars.length());
            activationCode.append(chars.charAt(randomIndex));
        }

        return activationCode.toString();
    }

    public LoginResponse authenticate(LoginBody loginBody) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginBody.getUsername(),
                        loginBody.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = appUserDAO.findByUsernameIgnoreCase(loginBody.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        claims.put("username", user.getUsername());

        var jwtToken = jwtService.generateToken(claims, user);
//        var refreshToken = jwtService.generateRefreshToken(user);
        return LoginResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public void activateAccount(String token) throws MessagingException {
        Token foundToken = tokenDAO.findByToken(token).orElseThrow(() -> new IllegalStateException("Token not found"));

        if (LocalDateTime.now().isAfter(foundToken.getExpiresAt())) {
            sendValidationEmail(foundToken.getUser());
            throw new InvalidToken("Activation token has expired. A new one has been sent, check your email");
        }

        AppUser user = appUserDAO.findById(foundToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User [%s] not found" + foundToken.getUser().getUsername()));

        user.setEnabled(true);
        appUserDAO.save(user);
        foundToken.setValidatedAt(LocalDateTime.now());
        tokenDAO.save(foundToken);
    }
}
