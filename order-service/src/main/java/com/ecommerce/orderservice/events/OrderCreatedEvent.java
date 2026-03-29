package com.ecommerce.orderservice.events;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderCreatedEvent extends BaseEvent {
    private String productCode;
    private Integer quantity;
    private Double amount;
    private String userEmail;

    public OrderCreatedEvent() {
        super();
        this.setEventType("ORDER_CREATED");
    }
}