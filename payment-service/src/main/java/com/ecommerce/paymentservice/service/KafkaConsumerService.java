package com.ecommerce.paymentservice.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final PaymentService paymentService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "inventory-events", groupId = "payment-service")
    public void handleStockReserved(String message) {
        try {
            JsonNode event = objectMapper.readTree(message);
            String orderId = event.get("orderId").asText();
            boolean success = event.get("success").asBoolean();

            if (success) {
                System.out.println("💳 Processing payment for order: " + orderId);
                // Process payment
                paymentService.processPayment(Map.of(
                        "orderId", orderId,
                        "userEmail", event.get("userEmail").asText(),
                        "amount", event.get("amount").asDouble()
                ));
                System.out.println("✅ Payment successful for order: " + orderId);
            }
        } catch (Exception e) {
            System.err.println("❌ Error processing payment: " + e.getMessage());
        }
    }
}