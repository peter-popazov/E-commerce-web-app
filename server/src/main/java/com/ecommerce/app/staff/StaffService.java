package com.ecommerce.app.staff;

import com.ecommerce.app.category.Category;
import com.ecommerce.app.category.CategoryRepository;
import com.ecommerce.app.inventory.Inventory;
import com.ecommerce.app.inventory.InventoryRepository;
import com.ecommerce.app.logging.LoggingService;
import com.ecommerce.app.product.Product;
import com.ecommerce.app.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@LoggingService
@Service
public class StaffService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryRepository inventoryRepository;

    @Autowired
    public StaffService(ProductRepository productRepository, CategoryRepository categoryRepository, InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public Product addNewProduct(ProductBody productBody) {
        Category category = categoryRepository.findByName(productBody.getCategoryBody().getName())
                .orElseGet(() -> categoryRepository.save(Category.builder().name(productBody.getCategoryBody().getName()).build()));

        var product = Product
                .builder()
                .name(productBody.getName())
                .brand(productBody.getBrand())
                .price(productBody.getPrice())
                .filePath(productBody.getFilePath())
                .shortDescription(productBody.getShortDescription())
                .longDescription(productBody.getLongDescription())
                .category(category)
                .build();
        product = productRepository.save(product);

        var inventory = Inventory.builder()
                .product(product)
                .quantity(productBody.getInventoryQuantity())
                .build();
        inventoryRepository.save(inventory);

        return product;
    }


    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product updateProduct(Long id, ProductBody productBody) {
        return productRepository.findById(id).map(product -> {
            Category category = categoryRepository.findByName(productBody.getCategoryBody().getName())
                    .orElseGet(() -> categoryRepository.save(Category.builder().name(productBody.getCategoryBody().getName()).build()));

            product.setName(productBody.getName());
            product.setBrand(productBody.getBrand());
            product.setPrice(productBody.getPrice());
            product.setFilePath(productBody.getFilePath());
            product.setShortDescription(productBody.getShortDescription());
            product.setLongDescription(productBody.getLongDescription());
            product.setCategory(category);

            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        if (productRepository.findById(id).isEmpty()) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}
