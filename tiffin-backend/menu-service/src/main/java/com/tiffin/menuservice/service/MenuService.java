package com.tiffin.menuservice.service;

import java.util.List;

import com.tiffin.menuservice.dto.request.CreateMenuRequest;
import com.tiffin.menuservice.dto.request.UpdateMenuRequest;
import com.tiffin.menuservice.dto.response.MenuResponse;
import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;

public interface MenuService {

    MenuResponse createMenu(CreateMenuRequest request);

    MenuResponse updateMenu(Long menuId, UpdateMenuRequest request);

    void deleteMenu(Long menuId);

    MenuResponse getMenuByDayAndMealType(
            DayOfWeek dayOfWeek,
            MealType mealType);

    List<MenuResponse> getWeeklyMenu();

    List<MenuResponse> getMenuByDay(DayOfWeek dayOfWeek);

    MenuResponse toggleAvailability(Long menuId);
}