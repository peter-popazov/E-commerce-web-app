package com.ecommerce.app.auth;

import com.ecommerce.app.auth.dto.LoginBody;
import com.ecommerce.app.auth.dto.LoginResponse;
import com.ecommerce.app.auth.dto.RegisterResponse;
import com.ecommerce.app.auth.dto.RegistrationBody;
import com.ecommerce.app.user.AppUser;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationBody registrationBody) throws MessagingException {
        RegisterResponse response = authService.register(registrationBody);
        return ResponseEntity.accepted().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
        return ResponseEntity.ok(authService.authenticate(loginBody));
    }

    @GetMapping("/activate-account")
    public void activateAccount(@RequestParam String token) throws MessagingException {
        authService.activateAccount(token);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(user);
    }
}
