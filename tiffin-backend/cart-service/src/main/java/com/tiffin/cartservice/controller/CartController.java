package com.tiffin.cartservice.controller;

import com.tiffin.cartservice.dto.AddToCartRequest;
import com.tiffin.cartservice.dto.CartResponse;
import com.tiffin.cartservice.dto.UpdateCartItemRequest;
import com.tiffin.cartservice.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
public class CartController {

    private final CartService cartService;

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addMealToCart(
            @Valid @RequestBody AddToCartRequest request,
            Authentication authentication) {

        String customerId = authentication.getName();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cartService.addItemToCart(customerId, request));
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            Authentication authentication) {

        String customerId = authentication.getName();

        return ResponseEntity.ok(
                cartService.getCart(customerId)
        );
    }

    @PutMapping("/items/{menuId}")
    public ResponseEntity<CartResponse> updateMealQuantity(
            @PathVariable Long menuId,
            @Valid @RequestBody UpdateCartItemRequest request,
            Authentication authentication) {

        String customerId = authentication.getName();

        return ResponseEntity.ok(
                cartService.updateCartItem(customerId, menuId, request)
        );
    }

    @DeleteMapping("/items/{menuId}")
    public ResponseEntity<CartResponse> removeMealFromCart(
            @PathVariable Long menuId,
            Authentication authentication) {

        String customerId = authentication.getName();

        return ResponseEntity.ok(
                cartService.removeItemFromCart(customerId, menuId)
        );
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            Authentication authentication) {

        String customerId = authentication.getName();

        cartService.clearCart(customerId);

        return ResponseEntity.noContent().build();
    }
    
    
}