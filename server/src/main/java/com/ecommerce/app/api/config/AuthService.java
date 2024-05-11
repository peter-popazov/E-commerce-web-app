package com.ecommerce.app.api.config;

import com.ecommerce.app.api.dto.RegisterResponse;
import com.ecommerce.app.api.dto.RegistrationBody;
import com.ecommerce.app.exception.DuplicateEmail;
import com.ecommerce.app.exception.DuplicateUsername;
import com.ecommerce.app.exception.NotMatchingPasswords;
import com.ecommerce.app.model.AppUser;
import com.ecommerce.app.model.dao.AppUserDAO;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AppUserDAO appUserDAO;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public RegisterResponse register(RegistrationBody registrationBody) throws DuplicateUsername, NotMatchingPasswords, DuplicateEmail {
        if (appUserDAO.findByEmailIgnoreCase(registrationBody.getEmail()).isPresent()) {
            throw new DuplicateEmail("Email already used");
        }

        if (appUserDAO.findByUsernameIgnoreCase(registrationBody.getUsername()).isPresent()) {
            throw new DuplicateUsername("Username already used");
        }

        if (!registrationBody.getPassword().equals(registrationBody.getConfirmPassword())) {
            throw new NotMatchingPasswords("Passwords do not match");
        }

        AppUser appUser = new AppUser();
        appUser.setUsername(registrationBody.getUsername());
        appUser.setPassword(passwordEncoder.encode(registrationBody.getPassword()));
        appUser.setEmail(registrationBody.getEmail());
        appUser.setFirstName(registrationBody.getFirstName());
        appUser.setLastName(registrationBody.getLastName());
        appUserDAO.save(appUser);

        var jwtToken = jwtService.generateToken(appUser);
        return RegisterResponse.builder().accessToken(jwtToken).build();
    }

}
