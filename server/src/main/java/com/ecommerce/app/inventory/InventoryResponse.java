package com.ecommerce.app.inventory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class InventoryResponse {

    private Long productId;

    private Integer quantity;
}
