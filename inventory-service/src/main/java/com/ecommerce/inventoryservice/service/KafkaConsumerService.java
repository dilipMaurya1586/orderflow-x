package com.ecommerce.inventoryservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final InventoryService inventoryService;
    private final KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "order-events", groupId = "inventory-service")
    public void handleOrderCreated(String message) {
        try {
            JsonNode event = objectMapper.readTree(message);
            String orderId = event.get("orderId").asText();
            String productCode = event.get("productCode").asText();
            int quantity = event.get("quantity").asInt();
            String userEmail = event.get("userEmail").asText();
            double amount = event.get("amount").asDouble();

            System.out.println("📦 Received ORDER_CREATED: " + orderId);

            // Reserve stock
            boolean success = true;
            try {
                inventoryService.reserveStock(productCode, quantity);
                System.out.println("✅ Stock reserved for order: " + orderId);
            } catch (Exception e) {
                success = false;
                System.err.println("❌ Stock reserve failed: " + e.getMessage());
            }

            // Send event to payment-service
            kafkaProducerService.sendStockReservedEvent(orderId, productCode, quantity, success, userEmail, amount);

        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
        }
    }
}