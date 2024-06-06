package com.ecommerce.app.staff;

import com.ecommerce.app.category.CategoryBody;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductBody {

    @NotEmpty(message = "The category name cannot be empty")
    @NotBlank(message = "The category name cannot be empty")
    private String name;

    @NotEmpty(message = "The image filepath cannot be empty")
    @NotBlank(message = "The image filepath cannot be empty")
    private String filePath;

    @NotEmpty(message = "The short description cannot be empty")
    @NotBlank(message = "The short description cannot be empty")
    private String shortDescription;

    @NotEmpty(message = "The long description cannot be empty")
    @NotBlank(message = "The long description cannot be empty")
    private String longDescription;

    @NotEmpty(message = "The brand name cannot be empty")
    @NotBlank(message = "The brand name cannot be empty")
    private String brand;

    @NotNull(message = "The price cannot be empty")
    private Integer price;

    @NotNull(message = "The inventory quantity cannot be empty")
    private Integer inventoryQuantity;

    private CategoryBody categoryBody;

}
