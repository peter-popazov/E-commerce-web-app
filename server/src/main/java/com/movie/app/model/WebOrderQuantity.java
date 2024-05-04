package com.movie.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "web_order_quantity")
public class WebOrderQuantity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @ManyToOne(optional=false)
    @JoinColumn(name = "order_id", nullable = false)
    private WebOrder order;
}
