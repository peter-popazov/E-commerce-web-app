package com.ecommerce.app.auth;

import com.ecommerce.app.auth.dto.*;
import com.ecommerce.app.user.AppUser;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationBody registrationBody) throws MessagingException {
        registrationBody.setRole("CUSTOMER");
        AuthResponse response = authService.register(registrationBody);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
        return ResponseEntity.ok(authService.authenticate(loginBody));
    }

    @GetMapping("/activate-account")
    public ResponseEntity<String> activateAccount(@RequestParam String token) throws MessagingException {
        authService.activateAccount(token);
        return ResponseEntity.ok().body("Account activated successfully");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/change-password")
    public ResponseEntity<String> updatePassword(@AuthenticationPrincipal AppUser user,
                                            @RequestBody ChangePasswordBody changePasswordBody) throws MessagingException {
        authService.changePassword(user, changePasswordBody);
        return ResponseEntity.ok().body("Password was changed successfully. Confirmation email has been sent to your email.");
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response ) throws IOException {
        authService.refreshToken(request, response);
    }
}
