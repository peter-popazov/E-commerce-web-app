package com.ecommerce.app.model.dao;

import com.ecommerce.app.model.Product;
import org.springframework.data.repository.ListCrudRepository;

public interface ProductDAO extends ListCrudRepository<Product, Long> {
}
