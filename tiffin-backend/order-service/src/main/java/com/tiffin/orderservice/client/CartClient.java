package com.tiffin.orderservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.tiffin.orderservice.client.dto.CartResponse;

@FeignClient(name = "CART-SERVICE")
public interface CartClient {

    @GetMapping("/cart")
    CartResponse getCart(
            @RequestHeader("Authorization") String authorizationHeader);

    @DeleteMapping("/cart")
    void clearCart(
            @RequestHeader("Authorization") String authorizationHeader);
}