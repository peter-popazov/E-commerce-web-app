package com.ecommerce.app.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ChangePasswordBody {

    @NotNull(message = "Old password field is mandatory")
    @NotBlank(message = "Old password field is mandatory")
    private String oldPassword;

    @NotNull(message = "Password field is mandatory")
    @NotBlank(message = "Password field is mandatory")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Required min. 8 characters, including one uppercase, one lower, one number or special symbol")
    private String newPassword;

    @NotNull(message = "Confirm password field is mandatory")
    @NotBlank(message = "Confirm password field is mandatory")
    private String confirmNewPassword;
}
