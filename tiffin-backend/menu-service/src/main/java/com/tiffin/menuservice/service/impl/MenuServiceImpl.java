package com.tiffin.menuservice.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tiffin.menuservice.dto.request.CreateMenuRequest;
import com.tiffin.menuservice.dto.request.MenuItemRequest;
import com.tiffin.menuservice.dto.request.UpdateMenuRequest;
import com.tiffin.menuservice.dto.response.MenuResponse;
import com.tiffin.menuservice.entity.enums.DayOfWeek;
import com.tiffin.menuservice.entity.enums.MealType;
import com.tiffin.menuservice.exception.MenuAlreadyExistsException;
import com.tiffin.menuservice.exception.MenuNotFoundException;
import com.tiffin.menuservice.repository.MenuItemRepository;
import com.tiffin.menuservice.repository.MenuRepository;
import com.tiffin.menuservice.service.MenuService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.stream.Collectors;

import com.tiffin.menuservice.dto.response.MenuItemResponse;
import com.tiffin.menuservice.entity.Menu;
import com.tiffin.menuservice.entity.MenuItem;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    public MenuResponse createMenu(CreateMenuRequest request) {

        menuRepository.findByDayOfWeekAndMealType(
                request.getDayOfWeek(),
                request.getMealType()
        ).ifPresent(menu -> {
            throw new MenuAlreadyExistsException(
                    "Menu already exists for "
                            + request.getDayOfWeek()
                            + " "
                            + request.getMealType()
            );
        });

        Menu menu = mapToEntity(request);

        Menu savedMenu = menuRepository.save(menu);

        return mapToResponse(savedMenu);
    }

    @Override
    public MenuResponse updateMenu(Long menuId, UpdateMenuRequest request) {

        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() ->
                        new MenuNotFoundException("Menu not found with id : " + menuId));

        // Check duplicate (except current menu)
        menuRepository.findByDayOfWeekAndMealType(
                request.getDayOfWeek(),
                request.getMealType()
        ).ifPresent(existingMenu -> {
            if (!existingMenu.getId().equals(menuId)) {
                throw new MenuAlreadyExistsException(
                        "Menu already exists for "
                                + request.getDayOfWeek()
                                + " "
                                + request.getMealType());
            }
        });

        menu.setDayOfWeek(request.getDayOfWeek());
        menu.setMealType(request.getMealType());
        menu.setTitle(request.getTitle());
        menu.setDescription(request.getDescription());
        menu.setPrice(request.getPrice());
        menu.setAvailable(request.getAvailable());

        // Remove old menu items
        menu.getMenuItems().clear();

        int order = 1;

        for (MenuItemRequest itemRequest : request.getItems()) {

            MenuItem item = MenuItem.builder()
                    .itemName(itemRequest.getItemName())
                    .itemOrder(order++)
                    .menu(menu)
                    .build();

            menu.getMenuItems().add(item);
        }

        Menu updatedMenu = menuRepository.save(menu);

        return mapToResponse(updatedMenu);
    }

    @Override
    public void deleteMenu(Long menuId) {

        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() ->
                        new MenuNotFoundException(
                                "Menu not found with id : " + menuId));

        menuRepository.delete(menu);
    }

    @Override
    public MenuResponse getMenuByDayAndMealType(
            DayOfWeek dayOfWeek,
            MealType mealType) {

        Menu menu = menuRepository
                .findByDayOfWeekAndMealType(dayOfWeek, mealType)
                .orElseThrow(() ->
                        new MenuNotFoundException(
                                "Menu not found"));

        return mapToResponse(menu);
    }

    @Override
    public List<MenuResponse> getWeeklyMenu() {

        return menuRepository.findAll()
                .stream()
                .sorted(
                        Comparator.comparing(Menu::getDayOfWeek)
                                .thenComparing(Menu::getMealType)
                )
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<MenuResponse> getMenuByDay(DayOfWeek dayOfWeek) {

        return menuRepository
                .findByDayOfWeek(dayOfWeek)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public MenuResponse toggleAvailability(Long menuId) {

        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() ->
                        new MenuNotFoundException(
                                "Menu not found with id : " + menuId));

        menu.setAvailable(!menu.getAvailable());

        Menu updatedMenu = menuRepository.save(menu);

        return mapToResponse(updatedMenu);
    }
    
    private Menu mapToEntity(CreateMenuRequest request) {

        Menu menu = Menu.builder()
                .dayOfWeek(request.getDayOfWeek())
                .mealType(request.getMealType())
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .available(request.getAvailable())
                .menuItems(new ArrayList<>())
                .build();

        int order = 1;

        for (MenuItemRequest itemRequest : request.getItems()) {

            MenuItem item = MenuItem.builder()
                    .itemName(itemRequest.getItemName())
                    .itemOrder(order++)
                    .menu(menu)
                    .build();

            menu.getMenuItems().add(item);
        }

        return menu;
    }
    
    private MenuResponse mapToResponse(Menu menu) {

        return MenuResponse.builder()
                .id(menu.getId())
                .dayOfWeek(menu.getDayOfWeek())
                .mealType(menu.getMealType())
                .title(menu.getTitle())
                .description(menu.getDescription())
                .price(menu.getPrice())
                .available(menu.getAvailable())
                .items(
                        menu.getMenuItems()
                                .stream()
                                .sorted(Comparator.comparing(MenuItem::getItemOrder))
                                .map(item -> MenuItemResponse.builder()
                                        .id(item.getId())
                                        .itemName(item.getItemName())
                                        .itemOrder(item.getItemOrder())
                                        .build())
                                .collect(Collectors.toList())
                )
                .build();
    }

}