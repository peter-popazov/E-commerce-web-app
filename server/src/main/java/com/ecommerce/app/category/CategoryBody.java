package com.ecommerce.app.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CategoryBody {

    @NotEmpty(message = "The category name cannot be empty")
    @NotBlank(message = "The category name cannot be empty")
    private String name;
}
