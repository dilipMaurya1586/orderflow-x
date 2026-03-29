package com.ecommerce.inventoryservice.events;


import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderCreatedEvent {
    private String eventId;
    private String eventType;
    private String orderId;
    private String productCode;
    private Integer quantity;
    private Double amount;
    private String userEmail;
    private LocalDateTime timestamp;
}