package com.ecommerce.inventoryservice.dto;


import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private Long productId;
    private String userEmail;
    private String userName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
