package com.ecommerce.orderservice.events;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BaseEvent {
    private String eventId;
    private String eventType;
    private String orderId;
    private LocalDateTime timestamp;

    public BaseEvent() {
        this.eventId = UUID.randomUUID().toString();
        this.timestamp = LocalDateTime.now();
    }
}