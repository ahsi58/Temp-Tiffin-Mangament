package com.tiffin.cartservice.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiffin.cartservice.client.MenuClient;
import com.tiffin.cartservice.dto.AddToCartRequest;
import com.tiffin.cartservice.dto.CartItemResponse;
import com.tiffin.cartservice.dto.CartResponse;
import com.tiffin.cartservice.dto.MenuResponse;
import com.tiffin.cartservice.dto.UpdateCartItemRequest;
import com.tiffin.cartservice.entity.Cart;
import com.tiffin.cartservice.exception.CartItemNotFoundException;
import com.tiffin.cartservice.exception.CartNotFoundException;
import com.tiffin.cartservice.repository.CartRepository;
import com.tiffin.cartservice.service.CartService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final MenuClient menuClient;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    @Transactional
    public CartResponse addItemToCart(
            String customerId,
            AddToCartRequest request) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseGet(() -> Cart.builder()
                        .customerId(customerId)
                        .itemsJson("[]")
                        .build());

        List<CartItemResponse> items =
                readItems(cart.getItemsJson());

        /*
         * Check whether this meal is already in cart.
         */
        for (CartItemResponse item : items) {

            if (item.getMenuId().equals(request.getMenuId())) {

                item.setQuantity(
                        item.getQuantity() + request.getQuantity()
                );

                cart.setItemsJson(writeItems(items));

                Cart saved = cartRepository.save(cart);

                return mapToResponse(saved);
            }
        }

        /*
         * Get today's available menu from Menu Service.
         */
        List<MenuResponse> menus =
                menuClient.getWeeklyMenu();

        String today =
                LocalDate.now()
                        .getDayOfWeek()
                        .name();

        String currentMealType =
                getCurrentMealType();

        /*
         * Find the requested complete meal.
         *
         * IMPORTANT:
         * The MenuResponse must contain dayOfWeek and mealType
         * for this validation to work.
         */
        MenuResponse selectedMenu = menus.stream()
                .filter(menu ->
                        menu.getId().equals(request.getMenuId())
                        && Boolean.TRUE.equals(menu.getAvailable())
                        && today.equals(menu.getDayOfWeek())
                        && currentMealType.equals(menu.getMealType()))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "This meal is not available for ordering right now."
                        )
                );

        /*
         * Store only the information Cart actually needs.
         *
         * We are ordering the complete meal,
         * NOT individual menu items.
         */
        items.add(
                CartItemResponse.builder()
                        .menuId(selectedMenu.getId())
                        .title(selectedMenu.getTitle())
                        .price(selectedMenu.getPrice())
                        .quantity(request.getQuantity())
                        .build()
        );

        cart.setItemsJson(writeItems(items));

        Cart saved = cartRepository.save(cart);

        return mapToResponse(saved);
    }

    @Override
    public CartResponse getCart(String customerId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new CartNotFoundException(
                                "No cart found for customer: "
                                        + customerId
                        ));

        return mapToResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse updateCartItem(
            String customerId,
            Long menuId,
            UpdateCartItemRequest request) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new CartNotFoundException(
                                "No cart found for customer: "
                                        + customerId
                        ));

        List<CartItemResponse> items =
                readItems(cart.getItemsJson());

        boolean found = false;

        for (CartItemResponse item : items) {

            if (item.getMenuId().equals(menuId)) {

                item.setQuantity(request.getQuantity());

                found = true;
                break;
            }
        }

        if (!found) {
            throw new CartItemNotFoundException(
                    "Meal not found in cart: " + menuId
            );
        }

        cart.setItemsJson(writeItems(items));

        Cart saved = cartRepository.save(cart);

        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public CartResponse removeItemFromCart(
            String customerId,
            Long menuId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new CartNotFoundException(
                                "No cart found for customer: "
                                        + customerId
                        ));

        List<CartItemResponse> items =
                readItems(cart.getItemsJson());

        boolean removed =
                items.removeIf(
                        item -> item.getMenuId().equals(menuId)
                );

        if (!removed) {
            throw new CartItemNotFoundException(
                    "Meal not found in cart: " + menuId
            );
        }

        cart.setItemsJson(writeItems(items));

        Cart saved = cartRepository.save(cart);

        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public void clearCart(String customerId) {

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() ->
                        new CartNotFoundException(
                                "No cart found for customer: "
                                        + customerId
                        ));

        cart.setItemsJson("[]");

        cartRepository.save(cart);
    }

    private List<CartItemResponse> readItems(String json) {

        try {

            if (json == null || json.isBlank()) {
                return new ArrayList<>();
            }

            return objectMapper.readValue(
                    json,
                    new TypeReference<List<CartItemResponse>>() {
                    }
            );

        } catch (Exception e) {

            return new ArrayList<>();
        }
    }

    private String writeItems(
            List<CartItemResponse> items) {

        try {

            return objectMapper.writeValueAsString(items);

        } catch (Exception e) {

            return "[]";
        }
    }

    private CartResponse mapToResponse(Cart cart) {

        List<CartItemResponse> items =
                readItems(cart.getItemsJson());

        BigDecimal total =
                items.stream()
                        .map(item ->
                                item.getPrice()
                                        .multiply(
                                                BigDecimal.valueOf(
                                                        item.getQuantity()
                                                )
                                        )
                        )
                        .reduce(
                                BigDecimal.ZERO,
                                BigDecimal::add
                        );

        return CartResponse.builder()
                .id(cart.getId())
                .customerId(cart.getCustomerId())
                .items(items)
                .totalAmount(total)
                .build();
    }

    /*
     * Before 4 PM -> Lunch
     * From 4 PM onwards -> Dinner
     */
    private String getCurrentMealType() {

        LocalTime now = LocalTime.now();

        if (now.isBefore(LocalTime.of(16, 0))) {
            return "LUNCH";
        }

        return "DINNER";
    }
}
