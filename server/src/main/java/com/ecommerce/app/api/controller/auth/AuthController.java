package com.ecommerce.app.api.controller.auth;

import com.ecommerce.app.api.dto.LoginBody;
import com.ecommerce.app.api.dto.LoginResponse;
import com.ecommerce.app.api.dto.RegisterResponse;
import com.ecommerce.app.api.dto.RegistrationBody;
import com.ecommerce.app.api.config.AuthService;
import com.ecommerce.app.exception.DuplicateEmail;
import com.ecommerce.app.exception.DuplicateUsername;
import com.ecommerce.app.exception.NotMatchingPasswords;
import com.ecommerce.app.model.AppUser;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationBody registrationBody) throws MessagingException {
        try {
            RegisterResponse response = authService.register(registrationBody);
            return ResponseEntity.ok().body(response);
        } catch (DuplicateUsername | DuplicateEmail e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (NotMatchingPasswords e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
//        String jwt = userService.loginUser(loginBody);
//        if (jwt != null) {
//            LoginResponse loginResponse = new LoginResponse();
//            loginResponse.setToken(jwt);
//            return ResponseEntity.ok().body(loginResponse);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }

        return ResponseEntity.ok(authService.authenticate(loginBody));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal AppUser user) {

        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok(user);
    }
}
