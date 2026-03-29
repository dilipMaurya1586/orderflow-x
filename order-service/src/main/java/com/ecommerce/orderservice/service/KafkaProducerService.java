package com.ecommerce.orderservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void sendOrderCreatedEvent(String orderId, String productCode, int quantity, double amount, String userEmail) {
        try {
            Map<String, Object> event = new HashMap<>();
            event.put("eventId", UUID.randomUUID().toString());
            event.put("eventType", "ORDER_CREATED");
            event.put("orderId", orderId);
            event.put("productCode", productCode);
            event.put("quantity", quantity);
            event.put("amount", amount);
            event.put("userEmail", userEmail);
            event.put("timestamp", System.currentTimeMillis());

            String message = objectMapper.writeValueAsString(event);
            kafkaTemplate.send("order-events", orderId, message);
            System.out.println("✅ Order created event sent for order: " + orderId);
        } catch (Exception e) {
            System.err.println("❌ Failed to send order created event: " + e.getMessage());
        }
    }
}