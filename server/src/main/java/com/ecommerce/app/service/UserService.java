package com.ecommerce.app.service;

import com.ecommerce.app.api.dto.LoginBody;
import com.ecommerce.app.api.dto.RegistrationBody;
import com.ecommerce.app.exception.DuplicateUser;
import com.ecommerce.app.exception.NotMatchingPasswords;
import com.ecommerce.app.model.AppUser;
import com.ecommerce.app.model.dao.AppUserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final AppUserDAO appUserDAO;
    private final EncryptionService encryptionService;
    private final JWTService jwtService;

    @Autowired
    public UserService(AppUserDAO appUserDAO, EncryptionService encryptionService, JWTService jwtService) {
        this.appUserDAO = appUserDAO;
        this.encryptionService = encryptionService;
        this.jwtService = jwtService;
    }

    public AppUser registerUser(RegistrationBody registrationBody) throws DuplicateUser, NotMatchingPasswords {
        if (appUserDAO.findByEmailIgnoreCase(registrationBody.getEmail()).isPresent()) {
            throw new DuplicateUser("Email already used");
        }
        ;
        if (appUserDAO.findByEmailIgnoreCase(registrationBody.getUsername()).isPresent()) {
            throw new DuplicateUser("Username already used");
        }
        ;
        if (!registrationBody.getPassword().equals(registrationBody.getConfirmPassword())) {
            throw new NotMatchingPasswords("Passwords do not match");
        }

        AppUser appUser = new AppUser();
        appUser.setEmail(registrationBody.getEmail());
        appUser.setUsername(registrationBody.getUsername());
        appUser.setFirstName(registrationBody.getFirstName());
        appUser.setLastName(registrationBody.getLastName());

        appUser.setPassword(encryptionService.encryptPassword(registrationBody.getPassword()));

        return appUserDAO.save(appUser);
    }

    public String loginUser(LoginBody loginBody) {
        Optional<AppUser> appUser = appUserDAO.findByUsernameIgnoreCase(loginBody.getUsername());
        if (appUser.isEmpty()) {
            return null;
        }
        AppUser user = appUser.get();
        if (!encryptionService.checkPassword(loginBody.getPassword(), user.getPassword())) {
            return null;
        }
        return jwtService.createToken(user);

    }
}
