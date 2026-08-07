package com.tiffin.orderservice.service.impl;

import com.tiffin.orderservice.client.CartClient;
import com.tiffin.orderservice.client.dto.CartResponse;
import com.tiffin.orderservice.dto.*;
import com.tiffin.orderservice.entity.Order;
import com.tiffin.orderservice.entity.OrderItem;
import com.tiffin.orderservice.entity.OrderStatus;
import com.tiffin.orderservice.exception.InvalidOrderStatusException;
import com.tiffin.orderservice.exception.OrderNotFoundException;
import com.tiffin.orderservice.exception.ResourceNotFoundException;
import com.tiffin.orderservice.exception.UnauthorizedOrderAccessException;
import com.tiffin.orderservice.repository.OrderRepository;
import com.tiffin.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartClient cartClient;

    /**
     * Creates an order from the customer's cart.
     *
     * Payment is already verified by Cart Service before
     * this method is called.
     */
    @Override
    @Transactional
    public OrderResponse placeOrder(
            String customerId,
            String authorizationHeader) {

        // Get the customer's cart
        CartResponse cart = cartClient.getCart(authorizationHeader);

        // Cart must contain at least one meal
        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new ResourceNotFoundException("Cart is empty");
        }

        // Create order
        Order order = Order.builder()
                .customerId(customerId)
                .status(OrderStatus.PLACED)
                .orderDate(LocalDateTime.now())
                .totalAmount(cart.getTotalAmount())
                .build();

        // Convert cart items into order items
        List<OrderItem> items = cart.getItems()
                .stream()
                .map(cartItem -> OrderItem.builder()
                        .order(order)
                        .menuId(cartItem.getMenuId())
                        .title(cartItem.getTitle())
                        .quantity(cartItem.getQuantity())
                        .price(cartItem.getPrice())
                        .build())
                .collect(Collectors.toList());

        order.setItems(items);

        // Save order
        Order savedOrder = orderRepository.save(order);

        // Clear cart only after successful order creation
        cartClient.clearCart(authorizationHeader);

        return mapToResponse(savedOrder);
    }

    /**
     * Get a specific order.
     *
     * Customer can only access their own order.
     * Vendor can access any order.
     */
    @Override
    public OrderResponse getOrderById(
            Long orderId,
            String requesterId,
            boolean isVendor) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new OrderNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        // Vendor can access all orders
        // Customer can access only their own order
        if (!isVendor && !order.getCustomerId().equals(requesterId)) {
            throw new UnauthorizedOrderAccessException(
                    "You are not allowed to view this order"
            );
        }

        return mapToResponse(order);
    }

    /**
     * Get order history for a customer.
     */
    @Override
    public List<OrderResponse> getOrderHistory(String customerId) {

        return orderRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Vendor gets all orders.
     */
    @Override
    public List<OrderResponse> getAllOrders() {

        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Vendor updates order status.
     */
    @Override
    @Transactional
    public OrderResponse updateOrderStatus(
            Long orderId,
            OrderStatusUpdateRequest request) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new OrderNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        // Completed and cancelled orders cannot be modified
        if (order.getStatus() == OrderStatus.CANCELLED
                || order.getStatus() == OrderStatus.COMPLETED) {

            throw new InvalidOrderStatusException(
                    "Cannot update status of a "
                            + order.getStatus()
                            + " order"
            );
        }

        order.setStatus(request.getStatus());

        Order savedOrder = orderRepository.save(order);

        return mapToResponse(savedOrder);
    }

    /**
     * Converts Order entity to OrderResponse DTO.
     */
    private OrderResponse mapToResponse(Order order) {

        List<OrderItemResponse> itemResponses = order.getItems()
                .stream()
                .map(item -> OrderItemResponse.builder()
                        .menuId(item.getMenuId())
                        .title(item.getTitle())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomerId())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .items(itemResponses)
                .build();
    }
}