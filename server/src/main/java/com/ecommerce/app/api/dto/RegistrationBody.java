package com.ecommerce.app.api.dto;

import com.ecommerce.app.api.config.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationBody {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 3, max = 255)
    private String username;

    @NotBlank
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    // Minimum eight characters, at least one uppercase letter,
    // one lowercase letter, one number and one special character:
    private String password;

    @NotBlank
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    private String confirmPassword;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

//    @NotBlank
//    private Role role;
}
