package com.ecommerce.inventoryservice.controller;  // ✅ Match your project

import com.ecommerce.inventoryservice.dto.ReviewRequest;
import com.ecommerce.inventoryservice.dto.ReviewResponse;
import com.ecommerce.inventoryservice.model.Review;
import com.ecommerce.inventoryservice.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<ReviewResponse> addReview(@RequestBody ReviewRequest request,
                                                    @RequestHeader("X-User-Email") String userEmail,
                                                    @RequestHeader("X-User-Name") String userName) {
        return ResponseEntity.ok(reviewService.addReview(request, userEmail, userName));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProduct(productId);
        List<ReviewResponse> responses = reviews.stream()
                .map(r -> {
                    ReviewResponse resp = new ReviewResponse();
                    resp.setId(r.getId());
                    resp.setProductId(r.getProductId());
                    resp.setUserEmail(r.getUserEmail());
                    resp.setUserName(r.getUserName());
                    resp.setRating(r.getRating());
                    resp.setComment(r.getComment());
                    resp.setCreatedAt(r.getCreatedAt());
                    return resp;
                }).collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/product/{productId}/rating")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getAverageRating(productId));
    }
}