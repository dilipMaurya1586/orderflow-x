package com.ecommerce.orderservice.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private String productCode;
    private Integer quantity;
    private String userEmail;
    private String address;
    private String phone;
    private String fullName;
}