package com.ecommerce.orderservice.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;
    private String userEmail;
    private String address;
    private String phone;
    private String fullName;
    private String productCode;
    private Integer quantity;
    private Double totalPrice;
    private String status; // PENDING, CONFIRMED, FAILED
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.orderId = "ORD-" + System.currentTimeMillis();
        this.status = "PENDING";
    }
}