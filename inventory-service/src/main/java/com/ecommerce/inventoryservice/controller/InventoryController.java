package com.ecommerce.inventoryservice.controller;

import com.ecommerce.inventoryservice.model.Inventory;
import com.ecommerce.inventoryservice.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getAllProducts() {
        return ResponseEntity.ok(inventoryService.getAllProducts());
    }

    @PostMapping("/add")
    public ResponseEntity<Inventory> addProduct(@RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.addProduct(inventory));
    }

    @GetMapping("/{productCode}")
    public ResponseEntity<Inventory> getProduct(@PathVariable String productCode) {
        return ResponseEntity.ok(inventoryService.getByProductCode(productCode));
    }

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveStock(@RequestBody Map<String, Object> request) {
        String productCode = (String) request.get("productCode");
        int quantity = (int) request.get("quantity");
        inventoryService.reserveStock(productCode, quantity);
        return ResponseEntity.ok("Stock reserved");
    }

    @PostMapping("/release")
    public ResponseEntity<String> releaseStock(@RequestBody Map<String, Object> request) {
        String productCode = (String) request.get("productCode");
        int quantity = (int) request.get("quantity");
        inventoryService.releaseStock(productCode, quantity);
        return ResponseEntity.ok("Stock released");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateProduct(@PathVariable Long id, @RequestBody Inventory inventory) {
        Inventory existing = inventoryService.getById(id);
        existing.setProductName(inventory.getProductName());
        existing.setProductCode(inventory.getProductCode());
        existing.setQuantity(inventory.getQuantity());
        existing.setPrice(inventory.getPrice());
        existing.setCategory(inventory.getCategory());
        existing.setImageUrl(inventory.getImageUrl());
        existing.setDescription(inventory.getDescription());
        existing.setBrand(inventory.getBrand());
        existing.setOriginalPrice(inventory.getOriginalPrice());
        return ResponseEntity.ok(inventoryService.update(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        inventoryService.delete(id);
        return ResponseEntity.ok("Product deleted successfully");
    }


}