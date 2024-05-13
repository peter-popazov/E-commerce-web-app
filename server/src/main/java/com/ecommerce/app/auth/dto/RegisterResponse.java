package com.ecommerce.app.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
@Builder
public class RegisterResponse {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("expires_in")
    @Value("${jwt.expiration}")
    private String expiresIn;

}