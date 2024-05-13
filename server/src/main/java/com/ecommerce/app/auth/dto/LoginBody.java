package com.ecommerce.app.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginBody {

    @NotNull
    @NotBlank(message = "Username field is mandatory")
    private String username;

    @NotNull
    @NotBlank(message = "Password field is mandatory")
    private String password;
}
