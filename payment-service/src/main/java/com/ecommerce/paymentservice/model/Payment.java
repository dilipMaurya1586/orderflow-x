package com.ecommerce.paymentservice.model;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentId;
    private String orderId;
    private String userEmail;
    private Double amount;
    private String status; // SUCCESS, FAILED, REFUNDED
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.paymentId = "PAY-" + System.currentTimeMillis();
        this.status = "SUCCESS";
    }
}