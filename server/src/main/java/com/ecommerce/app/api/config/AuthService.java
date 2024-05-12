package com.ecommerce.app.api.config;

import com.ecommerce.app.api.dto.LoginBody;
import com.ecommerce.app.api.dto.LoginResponse;
import com.ecommerce.app.api.dto.RegisterResponse;
import com.ecommerce.app.api.dto.RegistrationBody;
import com.ecommerce.app.api.email.EmailService;
import com.ecommerce.app.api.email.EmailTemplateName;
import com.ecommerce.app.exception.DuplicateEmail;
import com.ecommerce.app.exception.DuplicateUsername;
import com.ecommerce.app.exception.NotMatchingPasswords;
import com.ecommerce.app.model.AppUser;
import com.ecommerce.app.model.Token;
import com.ecommerce.app.model.dao.AppUserDAO;
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

    public RegisterResponse register(RegistrationBody registrationBody) throws
            DuplicateUsername, NotMatchingPasswords, DuplicateEmail, MessagingException {
        if (appUserDAO.findByEmailIgnoreCase(registrationBody.getEmail()).isPresent()) {
            throw new DuplicateEmail("Email already used");
        }

        if (appUserDAO.findByUsernameIgnoreCase(registrationBody.getUsername()).isPresent()) {
            throw new DuplicateUsername("Username already used");
        }

        if (!registrationBody.getPassword().equals(registrationBody.getConfirmPassword())) {
            throw new NotMatchingPasswords("Passwords do not match");
        }

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

        var user = appUserDAO.findByUsernameIgnoreCase(loginBody.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        var jwtToken = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(user);
        return LoginResponse.builder()
                .accessToken(jwtToken)
                .build();
    }
}
