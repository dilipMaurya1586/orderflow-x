package com.ecommerce.orderservice.events;


import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class PaymentProcessedEvent extends BaseEvent {
    private Double amount;
    private Boolean success;
    private String paymentId;
    private String message;

    public PaymentProcessedEvent() {
        super();
        this.setEventType("PAYMENT_PROCESSED");
    }
}