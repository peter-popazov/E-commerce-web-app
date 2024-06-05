package com.ecommerce.app.inventory;

import com.ecommerce.app.product.Product;
import com.ecommerce.app.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        // Fetch all inventory items from the repository
        List<Inventory> inventoryItems = inventoryRepository.findAll();

        // Map each inventory item to an InventoryResponse object
        List<InventoryResponse> inventoryResponses = inventoryItems.stream()
                .map(item -> new InventoryResponse(item.getProduct().getId(), item.getQuantity()))
                .toList();

        return inventoryResponses;

    }

    public Inventory addInventory(InventoryDto inventoryDto) {
        Product product = productRepository.findById(inventoryDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + inventoryDto.getProductId()));

        return inventoryRepository.save(Inventory
                .builder()
                .product(product)
                .quantity(inventoryDto.getQuantity())
                .build());
    }
}
