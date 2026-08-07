package com.tiffin.cartservice.dto;

import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponse {

	private Long menuId;
	private String title;
	private BigDecimal price;
	private Integer quantity;
}