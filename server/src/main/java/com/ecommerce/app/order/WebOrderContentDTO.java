package com.ecommerce.app.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class WebOrderContentDTO {

    @NotNull
    @NotBlank
    private Long productId;

    @NotNull
    @NotBlank
    @Positive(message = "Quantity cannot be 0 or negative")
    private Integer quantity;
}