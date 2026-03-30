package com.ecommerce.orderservice.service;

import com.ecommerce.orderservice.dto.OrderRequest;
import com.ecommerce.orderservice.dto.OrderResponse;
import com.ecommerce.orderservice.model.Order;
import com.ecommerce.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;
    private final KafkaProducerService kafkaProducerService;

    @Value("${inventory.service.url}")
    private String inventoryServiceUrl;

    public OrderResponse createOrder(OrderRequest request) {
        Order order = new Order();
        order.setProductCode(request.getProductCode());
        order.setQuantity(request.getQuantity());
        order.setUserEmail(request.getUserEmail());
        order.setAddress(request.getAddress());
        order.setPhone(request.getPhone());
        order.setFullName(request.getFullName());

        Double price = getProductPrice(request.getProductCode());
        order.setTotalPrice(price * request.getQuantity());
        order.setStatus("PENDING");

        orderRepository.save(order);

        // Kafka optional — agar nahi chala toh order fail nahi hoga
        try {
            kafkaProducerService.sendOrderCreatedEvent(
                    order.getOrderId(),
                    request.getProductCode(),
                    request.getQuantity(),
                    order.getTotalPrice(),
                    request.getUserEmail()
            );
        } catch (Exception e) {
            System.err.println("⚠️ Kafka event failed (non-critical): " + e.getMessage());
        }

        return new OrderResponse(order.getOrderId(), "PENDING", "Order created, processing...");
    }

    private Double getProductPrice(String productCode) {
        try {
            String url = inventoryServiceUrl + "/api/inventory/" + productCode;
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return ((Number) response.get("price")).doubleValue();
        } catch (Exception e) {
            throw new RuntimeException("Product not found");
        }
    }

    public Order getOrder(String orderId) {
        return orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByUser(String email) {
        return orderRepository.findByUserEmail(email);
    }

    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}