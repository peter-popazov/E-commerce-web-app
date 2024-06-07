package com.ecommerce.app.inventory;

import com.ecommerce.app.logging.LoggingController;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@LoggingController
@RestController
@RequestMapping("/inventory")
@PreAuthorize("hasRole('STAFF')")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<Inventory> addInventory(@Valid @RequestBody InventoryBody inventoryDto) {
        return ResponseEntity.ok(inventoryService.addInventory(inventoryDto));
    }

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> addInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getInventoryForProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventoryForProduct(productId));
    }

    @PutMapping
    public ResponseEntity<Void> updateProductQuantities(@Valid @RequestBody List<InventoryResponse> productUpdates) {
        inventoryService.updateProductQuantities(productUpdates);
        return ResponseEntity.ok().build();
    }
}
