package com.ecommerce.orderservice.events;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class StockReservedEvent extends BaseEvent {
    private String productCode;
    private Integer quantity;
    private Boolean success;
    private String message;

    public StockReservedEvent() {
        super();
        this.setEventType("STOCK_RESERVED");
    }
}