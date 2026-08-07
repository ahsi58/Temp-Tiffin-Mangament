package com.tiffin.cartservice.service;

import com.tiffin.cartservice.dto.AddToCartRequest;
import com.tiffin.cartservice.dto.CartResponse;
import com.tiffin.cartservice.dto.UpdateCartItemRequest;

public interface CartService {

    CartResponse addItemToCart(
            String customerId,
            AddToCartRequest request);

    CartResponse getCart(
            String customerId);

    CartResponse updateCartItem(
            String customerId,
            Long menuId,
            UpdateCartItemRequest request);

    CartResponse removeItemFromCart(
            String customerId,
            Long menuId);

    void clearCart(
            String customerId);

}