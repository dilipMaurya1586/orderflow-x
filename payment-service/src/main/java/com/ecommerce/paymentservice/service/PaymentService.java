package com.ecommerce.paymentservice.service;

import com.ecommerce.paymentservice.model.Payment;
import com.ecommerce.paymentservice.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    // Step 1: Create Mock Razorpay Order
    public Map<String, Object> createRazorpayOrder(Map<String, Object> request) {
        String orderId = (String) request.get("orderId");
        String userEmail = (String) request.get("userEmail");
        Double amount = ((Number) request.get("amount")).doubleValue();

        String mockRazorpayOrderId = "order_mock_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16);

        Map<String, Object> response = new HashMap<>();
        response.put("razorpayOrderId", mockRazorpayOrderId);
        response.put("amount", amount);
        response.put("currency", "INR");
        response.put("keyId", "rzp_test_mock_key");
        response.put("orderId", orderId);
        response.put("userEmail", userEmail);

        return response;
    }

    // Step 2: Verify & Save Payment (Mock - always success)
    public Payment verifyAndSavePayment(Map<String, Object> request) {
        String razorpayOrderId = (String) request.get("razorpayOrderId");
        String razorpayPaymentId = (String) request.get("razorpayPaymentId");
        String orderId = (String) request.get("orderId");
        String userEmail = (String) request.get("userEmail");
        Double amount = ((Number) request.get("amount")).doubleValue();

        Payment payment = new Payment();
        payment.setOrderId(orderId);
        payment.setUserEmail(userEmail);
        payment.setAmount(amount);
        payment.setRazorpayOrderId(razorpayOrderId);
        payment.setRazorpayPaymentId(razorpayPaymentId != null ? razorpayPaymentId : "pay_mock_" + UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        payment.setStatus("SUCCESS");

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
}