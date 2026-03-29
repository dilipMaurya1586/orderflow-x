package com.ecommerce.paymentservice.service;


import com.ecommerce.paymentservice.model.Payment;
import com.ecommerce.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment processPayment(Map<String, Object> request) {
        String orderId = (String) request.get("orderId");
        String userEmail = (String) request.get("userEmail");
        Double amount = ((Number) request.get("amount")).doubleValue();

        // Check if already paid
        if (paymentRepository.findByOrderId(orderId).isPresent()) {
            throw new RuntimeException("Payment already processed for this order");
        }

        // Simulate payment processing
        boolean success = simulatePayment();

        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setUserEmail(userEmail);
        payment.setAmount(amount);

        if (!success) {
            payment.setStatus("FAILED");
            paymentRepository.save(payment);
            throw new RuntimeException("Payment failed");
        }

        return paymentRepository.save(payment);
    }

    public Payment refundPayment(String orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (!"SUCCESS".equals(payment.getStatus())) {
            throw new RuntimeException("Cannot refund - payment not successful");
        }

        payment.setStatus("REFUNDED");
        return paymentRepository.save(payment);
    }

    public Payment getPaymentByOrderId(String orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    private boolean simulatePayment() {
        // 95% success rate
        return true;
    }
}