package com.movie.app.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginBody {

    @NotBlank
    @NotNull
    private String username;

    @NotBlank
    @NotNull
    private String password;
}
