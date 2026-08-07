package com.tiffin.orderservice.client.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CartItemResponse {

    private Long menuId;

    private String title;

    private Integer quantity;

    private BigDecimal price;
}