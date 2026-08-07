package com.tiffin.orderservice.service;

import com.tiffin.orderservice.dto.OrderResponse;
import com.tiffin.orderservice.dto.OrderStatusUpdateRequest;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(
            String customerId,
            String authorizationHeader
    );

    OrderResponse getOrderById(
            Long orderId,
            String requesterId,
            boolean isVendor
    );

    List<OrderResponse> getOrderHistory(
            String customerId
    );

    List<OrderResponse> getAllOrders();

    OrderResponse updateOrderStatus(
            Long orderId,
            OrderStatusUpdateRequest request
    );
}