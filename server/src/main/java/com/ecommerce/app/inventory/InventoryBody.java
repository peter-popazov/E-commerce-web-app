package com.ecommerce.app.inventory;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class InventoryBody {

    @NotEmpty
    private Long productId;

    @NotEmpty
    private Integer quantity;

}
