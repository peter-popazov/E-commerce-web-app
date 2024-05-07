package com.movie.app.api.controller.auth;

import com.movie.app.api.dto.LoginBody;
import com.movie.app.api.dto.LoginResponse;
import com.movie.app.api.dto.RegistrationBody;
import com.movie.app.exception.DuplicateUser;
import com.movie.app.exception.NotMatchingPasswords;
import com.movie.app.model.AppUser;
import com.movie.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    public UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationBody registrationBody) {
        try {
            userService.registerUser(registrationBody);
            return ResponseEntity.ok().build();
        } catch (DuplicateUser e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (NotMatchingPasswords e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
        String jwt = userService.loginUser(loginBody);
        if (jwt != null) {
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwt);
            return ResponseEntity.ok().body(loginResponse);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/")
    public ResponseEntity<AppUser> getUser(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok().body(user);
    }

}
