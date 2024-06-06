package com.ecommerce.app.email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class OrderItem {

    private String image;

    private String name;

    private Integer quantity;

    private Integer price;

    private Integer subTotal;

}