package com.tiffin.orderservice.repository;

import com.tiffin.orderservice.entity.Order;
import com.tiffin.orderservice.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByCustomerId(String customerId);   // was Long
//	List<Order> findByVendorId(String vendorId);       // was Long
//	List<Order> findByVendorIdAndStatus(String vendorId, OrderStatus status);  // was Long
}