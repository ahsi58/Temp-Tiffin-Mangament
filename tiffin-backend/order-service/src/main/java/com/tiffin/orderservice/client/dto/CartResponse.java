package com.tiffin.orderservice.client.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CartResponse {

    private Long id;

    private String customerId;

    private List<CartItemResponse> items;

    private BigDecimal totalAmount;
}