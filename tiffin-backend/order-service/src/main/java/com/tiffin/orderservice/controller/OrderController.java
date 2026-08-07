package com.tiffin.orderservice.controller;

import com.tiffin.orderservice.dto.OrderResponse;
import com.tiffin.orderservice.dto.OrderStatusUpdateRequest;
import com.tiffin.orderservice.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {


private final OrderService orderService;

@PostMapping
@PreAuthorize("hasRole('CUSTOMER')")
public ResponseEntity<OrderResponse> placeOrder(
        @RequestHeader("Authorization") String authorizationHeader,
        Authentication authentication) {

    String customerId = authentication.getName();

    return ResponseEntity.ok(
            orderService.placeOrder(
                    customerId,
                    authorizationHeader
            )
    );
}

/**
 * Get a specific order.
 *
 * Customer -> only their own order
 * Vendor   -> any order
 */
@GetMapping("/{id}")
public ResponseEntity<OrderResponse> getOrderById(
        @PathVariable Long id,
        Authentication authentication) {

    String requesterId = authentication.getName();

    boolean isVendor = authentication.getAuthorities()
            .stream()
            .anyMatch(authority ->
                    authority.getAuthority().equals("ROLE_VENDOR"));

    return ResponseEntity.ok(
            orderService.getOrderById(
                    id,
                    requesterId,
                    isVendor
            )
    );
}

/**
 * Customer order history.
 */
@GetMapping("/history")
@PreAuthorize("hasRole('CUSTOMER')")
public ResponseEntity<List<OrderResponse>> getOrderHistory(
        Authentication authentication) {

    String customerId = authentication.getName();

    return ResponseEntity.ok(
            orderService.getOrderHistory(customerId)
    );
}

/**
 * Vendor gets all customer orders.
 */
@GetMapping("/all")
@PreAuthorize("hasRole('VENDOR')")
public ResponseEntity<List<OrderResponse>> getAllOrders() {

    return ResponseEntity.ok(
            orderService.getAllOrders()
    );
}

/**
 * Vendor updates order status.
 */
@PutMapping("/{id}/status")
@PreAuthorize("hasRole('VENDOR')")
public ResponseEntity<OrderResponse> updateOrderStatus(
        @PathVariable Long id,
        @Valid @RequestBody OrderStatusUpdateRequest request) {

    return ResponseEntity.ok(
            orderService.updateOrderStatus(
                    id,
                    request
            )
    );
}


}
