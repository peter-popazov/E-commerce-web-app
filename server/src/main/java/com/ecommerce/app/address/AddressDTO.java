package com.ecommerce.app.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDTO {

    @NotNull
    @NotBlank
    private String firstName;

    @NotNull
    @NotBlank
    private String lastName;

    @NotNull
    @NotBlank
    private String addressLine1;

    private String addressLine2;

    @NotNull
    @NotBlank
    private String city;

    @NotNull
    @NotBlank
    private String country;
}
