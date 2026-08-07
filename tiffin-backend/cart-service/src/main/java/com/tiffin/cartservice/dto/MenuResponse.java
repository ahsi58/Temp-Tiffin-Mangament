package com.tiffin.cartservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuResponse {

    private Long id;

    private String dayOfWeek;

    private String mealType;

    private String title;

    private BigDecimal price;

    private Boolean available;

    private List<MenuItemResponse> items;
}
