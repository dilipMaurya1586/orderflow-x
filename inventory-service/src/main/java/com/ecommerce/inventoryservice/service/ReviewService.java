package com.ecommerce.inventoryservice.service;  // ✅ Change to match your project

import com.ecommerce.inventoryservice.dto.ReviewRequest;
import com.ecommerce.inventoryservice.dto.ReviewResponse;
import com.ecommerce.inventoryservice.model.Review;
import com.ecommerce.inventoryservice.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewResponse addReview(ReviewRequest request, String userEmail, String userName) {
        Review review = new Review();
        review.setProductId(request.getProductId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUserEmail(userEmail);
        review.setUserName(userName);

        Review saved = reviewRepository.save(review);
        return mapToResponse(saved);
    }

    public List<Review> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public double getAverageRating(Long productId) {
        List<Review> reviews = reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
        if (reviews.isEmpty()) return 0;
        return reviews.stream().mapToInt(Review::getRating).average().orElse(0);
    }

    private ReviewResponse mapToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setProductId(review.getProductId());
        response.setUserEmail(review.getUserEmail());
        response.setUserName(review.getUserName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}