package com.ecommerce.app.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationBody {

    @NotBlank(message = "Email field is mandatory")
    @Email(message = "Email is not well formatted")
    private String email;

    @NotBlank(message = "Username field is mandatory")
    @Size(min = 3, max = 255, message = "Username should be from 3 to 255 symbols")
    private String username;

    @NotBlank(message = "Password field is mandatory")
    @Size(min = 8, max = 255, message = "Password should be from 8 to 255 symbols")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Required min. 8 characters, including one uppercase, one lower, one number or special symbol")
    private String password;

    @NotBlank(message = "Confirm password field is mandatory")
    @Size(min = 8, max = 255, message = "Password should be from 8 to 255 symbols")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    private String confirmPassword;

    @JsonIgnore
    private String role;
}
