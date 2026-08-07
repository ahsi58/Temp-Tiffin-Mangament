package com.tiffin.cartservice.service;

import com.tiffin.cartservice.dto.CreateRazorpayOrderResponse;
import com.tiffin.cartservice.dto.VerifyPaymentRequest;

public interface PaymentService {

    CreateRazorpayOrderResponse createOrder(String customerId);

    void verifyPayment(
            String customerId,
            String authorizationHeader,
            VerifyPaymentRequest request);
}