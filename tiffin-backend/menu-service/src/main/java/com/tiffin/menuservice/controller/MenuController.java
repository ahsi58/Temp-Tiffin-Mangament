package com.tiffin.menuservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.tiffin.menuservice.dto.request.CreateMenuRequest;
import com.tiffin.menuservice.dto.request.UpdateMenuRequest;
import com.tiffin.menuservice.dto.response.MenuResponse;
import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;
import com.tiffin.menuservice.service.MenuService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/menus")
@RequiredArgsConstructor
@Validated
public class MenuController {

    private final MenuService menuService;
    
    @PostMapping
    public ResponseEntity<MenuResponse> createMenu(
            @Valid @RequestBody CreateMenuRequest request) {

        MenuResponse response = menuService.createMenu(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    
    @PutMapping("/{menuId}")
    public ResponseEntity<MenuResponse> updateMenu(
            @PathVariable Long menuId,
            @Valid @RequestBody UpdateMenuRequest request) {

        MenuResponse response =
                menuService.updateMenu(menuId, request);

        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{menuId}")
    public ResponseEntity<Void> deleteMenu(
            @PathVariable Long menuId) {

        menuService.deleteMenu(menuId);

        return ResponseEntity.noContent().build();
    }
    
    @GetMapping
    public ResponseEntity<List<MenuResponse>> getWeeklyMenu() {

        return ResponseEntity.ok(
                menuService.getWeeklyMenu()
        );
    }
    
    @GetMapping("/{dayOfWeek}")
    public ResponseEntity<List<MenuResponse>> getMenuByDay(
            @PathVariable DayOfWeek dayOfWeek) {

        return ResponseEntity.ok(
                menuService.getMenuByDay(dayOfWeek)
        );
    }
    
    @GetMapping("/{dayOfWeek}/{mealType}")
    public ResponseEntity<MenuResponse> getMenuByDayAndMealType(
            @PathVariable DayOfWeek dayOfWeek,
            @PathVariable MealType mealType) {

        return ResponseEntity.ok(
                menuService.getMenuByDayAndMealType(
                        dayOfWeek,
                        mealType
                )
        );
    }
    
    @PatchMapping("/{menuId}/availability")
    public ResponseEntity<MenuResponse> toggleAvailability(
            @PathVariable Long menuId) {

        return ResponseEntity.ok(
                menuService.toggleAvailability(menuId)
        );
    }

}