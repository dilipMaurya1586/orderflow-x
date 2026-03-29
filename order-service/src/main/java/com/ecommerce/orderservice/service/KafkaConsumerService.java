package com.ecommerce.orderservice.service;


import com.ecommerce.orderservice.model.Order;
import com.ecommerce.orderservice.repository.OrderRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "inventory-events", groupId = "order-service")
    public void handleStockReserved(String message) {
        try {
            JsonNode event = objectMapper.readTree(message);
            String orderId = event.get("orderId").asText();
            boolean success = event.get("success").asBoolean();

            Order order = orderRepository.findByOrderId(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            if (success) {
                order.setStatus("CONFIRMED");
                orderRepository.save(order);
                System.out.println("✅ Order CONFIRMED: " + orderId);
            } else {
                order.setStatus("FAILED");
                orderRepository.save(order);
                System.out.println("❌ Order FAILED: " + orderId);
            }
        } catch (Exception e) {
            System.err.println("❌ Error: " + e.getMessage());
        }
    }
}