package com.tiffin.cartservice.service.impl;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import com.tiffin.cartservice.client.OrderClient;
import com.tiffin.cartservice.config.RazorpayProperties;
import com.tiffin.cartservice.dto.CartResponse;
import com.tiffin.cartservice.dto.CreateRazorpayOrderResponse;
import com.tiffin.cartservice.dto.OrderResponse;
import com.tiffin.cartservice.dto.VerifyPaymentRequest;
import com.tiffin.cartservice.entity.Payment;
import com.tiffin.cartservice.entity.PaymentStatus;
import com.tiffin.cartservice.exception.PaymentVerificationException;
import com.tiffin.cartservice.repository.PaymentRepository;
import com.tiffin.cartservice.service.CartService;
import com.tiffin.cartservice.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayProperties razorpayProperties;
    private final CartService cartService;
    private final OrderClient orderClient;
    private final PaymentRepository paymentRepository;

    @Override
    @Transactional
    public CreateRazorpayOrderResponse createOrder(String customerId) {

        // 1. Get customer's cart
        CartResponse cart = cartService.getCart(customerId);

        // 2. Validate cart
        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new PaymentVerificationException("Cart is empty");
        }

        if (cart.getTotalAmount() == null
                || cart.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new PaymentVerificationException(
                    "Cart total amount must be greater than zero"
            );
        }

        BigDecimal totalAmount = cart.getTotalAmount();

        long amountInPaise = totalAmount
                .multiply(BigDecimal.valueOf(100))
                .longValueExact();

        try {

            // 3. Create Razorpay client
            RazorpayClient razorpayClient = new RazorpayClient(
                    razorpayProperties.getKey().getId(),
                    razorpayProperties.getKey().getSecret()
            );

            // 4. Create Razorpay order
            JSONObject orderRequest = new JSONObject();

            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put(
                    "receipt",
                    "cart_" + customerId + "_" + System.currentTimeMillis()
            );

            com.razorpay.Order razorpayOrder =
                    razorpayClient.orders.create(orderRequest);

            String razorpayOrderId =
                    razorpayOrder.get("id").toString();

            // 5. Store payment record
            Payment payment = Payment.builder()
                    .customerId(customerId)
                    .razorpayOrderId(razorpayOrderId)
                    .amount(totalAmount)
                    .currency("INR")
                    .status(PaymentStatus.CREATED)
                    .paymentDate(LocalDateTime.now())
                    .build();

            paymentRepository.save(payment);

            // 6. Send Razorpay details to frontend
            return CreateRazorpayOrderResponse.builder()
                    .razorpayOrderId(razorpayOrderId)
                    .razorpayKeyId(
                            razorpayProperties.getKey().getId()
                    )
                    .amount(amountInPaise)
                    .currency("INR")
                    .build();

        } catch (RazorpayException e) {

            throw new PaymentVerificationException(
                    "Failed to create Razorpay order: "
                            + e.getMessage()
            );
        }
    }

    @Override
    @Transactional
    public void verifyPayment(
            String customerId,
            String authorizationHeader,
            VerifyPaymentRequest request) {

        try {

            // 1. Find payment record
            Payment payment = paymentRepository
                    .findByRazorpayOrderId(
                            request.getRazorpayOrderId()
                    )
                    .orElseThrow(() ->
                            new PaymentVerificationException(
                                    "Payment record not found for Razorpay order: "
                                            + request.getRazorpayOrderId()
                            )
                    );

            // 2. Verify payment belongs to customer
            if (!payment.getCustomerId().equals(customerId)) {

                throw new PaymentVerificationException(
                        "Payment does not belong to this customer"
                );
            }

            // 3. Prevent duplicate order creation
            if (payment.getOrderId() != null) {
                return;
            }

            // 4. Verify Razorpay signature
            JSONObject options = new JSONObject();

            options.put(
                    "razorpay_order_id",
                    request.getRazorpayOrderId()
            );

            options.put(
                    "razorpay_payment_id",
                    request.getRazorpayPaymentId()
            );

            options.put(
                    "razorpay_signature",
                    request.getRazorpaySignature()
            );

            boolean isValid = Utils.verifyPaymentSignature(
                    options,
                    razorpayProperties.getKey().getSecret()
            );

            if (!isValid) {

                payment.setStatus(PaymentStatus.FAILED);

                paymentRepository.save(payment);

                throw new PaymentVerificationException(
                        "Payment signature verification failed"
                );
            }

            // 5. Make sure cart still exists
            CartResponse cart =
                    cartService.getCart(customerId);

            if (cart.getItems() == null
                    || cart.getItems().isEmpty()) {

                throw new PaymentVerificationException(
                        "Cart is empty"
                );
            }

            /*
             * 6. Payment has been successfully verified.
             *
             * Order Service will fetch the customer's cart
             * using the Authorization header.
             */
            OrderResponse orderResponse =
                    orderClient.placeOrder(
                            authorizationHeader
                    );

            // 7. Store successful payment information
            payment.setRazorpayPaymentId(
                    request.getRazorpayPaymentId()
            );

            payment.setStatus(PaymentStatus.SUCCESS);

            payment.setOrderId(
                    orderResponse.getId()
            );

            paymentRepository.save(payment);

            /*
             * 8. Cart is NOT cleared here.
             *
             * Order Service clears the cart after
             * successfully creating the order.
             */

        } catch (RazorpayException e) {

            throw new PaymentVerificationException(
                    "Payment verification error: "
                            + e.getMessage()
            );
        }
    }
}