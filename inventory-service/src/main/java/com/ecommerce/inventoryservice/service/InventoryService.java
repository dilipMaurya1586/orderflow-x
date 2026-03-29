package com.ecommerce.inventoryservice.service;

import com.ecommerce.inventoryservice.model.Inventory;
import com.ecommerce.inventoryservice.model.Review;
import com.ecommerce.inventoryservice.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ReviewService reviewService;

    public List<Inventory> getAllProducts() {
        List<Inventory> products = inventoryRepository.findAll();
        for (Inventory product : products) {
            List<Review> reviews = reviewService.getReviewsByProduct(product.getId());
            double avgRating = reviews.stream().mapToInt(Review::getRating).average().orElse(0);
            product.setRating(avgRating);
            product.setReviewCount(reviews.size());
        }
        return products;
    }

    public Inventory addProduct(Inventory inventory) {
        if (inventoryRepository.existsByProductCode(inventory.getProductCode())) {
            throw new RuntimeException("Product already exists");
        }
        if (inventory.getQuantity() > 0) {
            inventory.setInStock(true);
        } else {
            inventory.setInStock(false);
        }
        return inventoryRepository.save(inventory);
    }

    public Inventory getByProductCode(String productCode) {
        Inventory product = inventoryRepository.findByProductCode(productCode)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<Review> reviews = reviewService.getReviewsByProduct(product.getId());
        double avgRating = reviews.stream().mapToInt(Review::getRating).average().orElse(0);
        product.setRating(avgRating);
        product.setReviewCount(reviews.size());

        return product;
    }

    public void reserveStock(String productCode, int quantity) {
        Inventory inventory = getByProductCode(productCode);
        if (inventory.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }
        inventory.setQuantity(inventory.getQuantity() - quantity);
        if (inventory.getQuantity() == 0) {
            inventory.setInStock(false);
        }
        inventoryRepository.save(inventory);
    }

    public void releaseStock(String productCode, int quantity) {
        Inventory inventory = getByProductCode(productCode);
        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventory.setInStock(true);
        inventoryRepository.save(inventory);
    }

    public Inventory getById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Inventory update(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public void delete(Long id) {
        inventoryRepository.deleteById(id);
    }
}