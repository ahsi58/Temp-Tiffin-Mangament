package com.tiffin.menuservice.dto.response;

import java.math.BigDecimal;
import java.util.List;

import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuResponse {

    private Long id;

    private DayOfWeek dayOfWeek;

    private MealType mealType;

    private String title;

    private String description;

    private BigDecimal price;

    private Boolean available;

    private List<MenuItemResponse> items;
}