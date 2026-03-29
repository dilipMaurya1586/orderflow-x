package com.ecommerce.inventoryservice.service;

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

    public void sendStockReservedEvent(String orderId, String productCode, int quantity, boolean success, String userEmail, double amount) {
        try {
            Map<String, Object> event = new HashMap<>();
            event.put("eventId", UUID.randomUUID().toString());
            event.put("eventType", "STOCK_RESERVED");
            event.put("orderId", orderId);
            event.put("productCode", productCode);
            event.put("quantity", quantity);
            event.put("success", success);
            event.put("userEmail", userEmail);
            event.put("amount", amount);
            event.put("timestamp", System.currentTimeMillis());  // ✅ Use long instead of LocalDateTime

            String message = objectMapper.writeValueAsString(event);
            kafkaTemplate.send("inventory-events", orderId, message);
            System.out.println("✅ Stock reserved event sent for order: " + orderId);
        } catch (Exception e) {
            System.err.println("❌ Failed to send stock reserved event: " + e.getMessage());
        }
    }
}