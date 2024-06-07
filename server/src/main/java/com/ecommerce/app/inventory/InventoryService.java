package com.ecommerce.app.inventory;

import com.ecommerce.app.logging.LoggingService;
import com.ecommerce.app.product.Product;
import com.ecommerce.app.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@LoggingService
@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository, ProductRepository productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
    }

    public Inventory getInventoryForProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        return inventoryRepository.findByProduct(product)
                .orElseThrow(() -> new RuntimeException("Inventory for product with id " + productId + " not found"));
    }

    public List<InventoryResponse> getAllInventory() {
        List<Inventory> inventoryItems = inventoryRepository.findAll();

        return inventoryItems.stream()
                .map(item -> new InventoryResponse(item.getProduct().getId(), item.getQuantity()))
                .toList();
    }

    @Transactional
    public Inventory addInventory(InventoryBody inventoryBody) {
        Product product = productRepository.findById(inventoryBody.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + inventoryBody.getProductId()));

        return inventoryRepository.save(Inventory
                .builder()
                .product(product)
                .quantity(inventoryBody.getQuantity())
                .build());
    }

    @Transactional
    public void updateProductQuantities(List<InventoryResponse> productUpdates) {
        for (InventoryResponse productUpdate : productUpdates) {
            Product product = productRepository.findById(productUpdate.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + productUpdate.getProductId()));
            Inventory inventory = inventoryRepository.findByProduct(product)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid product ID: " + productUpdate.getProductId()));

            inventory.setQuantity(productUpdate.getQuantity());
            inventoryRepository.save(inventory);
        }
    }
}
