package com.tiffin.menuservice.dto.request;

import java.math.BigDecimal;
import java.util.List;

import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateMenuRequest {

    @NotNull
    private DayOfWeek dayOfWeek;

    @NotNull
    private MealType mealType;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;

    @NotNull
    private Boolean available;

    @NotEmpty(message = "Menu must contain at least one item")
    private List<MenuItemRequest> items;
}