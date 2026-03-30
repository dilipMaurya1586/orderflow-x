package com.ecommerce.paymentservice.controller;

import com.ecommerce.paymentservice.model.Payment;
import com.ecommerce.paymentservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(paymentService.createRazorpayOrder(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<Payment> verifyPayment(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(paymentService.verifyAndSavePayment(request));
    }

    @PostMapping("/refund/{orderId}")
    public ResponseEntity<Payment> refundPayment(@PathVariable String orderId) {
        return ResponseEntity.ok(paymentService.refundPayment(orderId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrder(@PathVariable String orderId) {
        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId));
    }
}