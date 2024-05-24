package com.ecommerce.app.product;

import com.ecommerce.app.model.Category;
import com.ecommerce.app.model.CategoryRepository;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.model.dao.ProductDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductDAO productDAO;
    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }

}
