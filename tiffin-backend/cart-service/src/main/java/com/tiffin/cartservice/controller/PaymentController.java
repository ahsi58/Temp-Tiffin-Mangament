package com.tiffin.cartservice.controller;

import com.tiffin.cartservice.dto.CreateRazorpayOrderResponse;
import com.tiffin.cartservice.dto.VerifyPaymentRequest;
import com.tiffin.cartservice.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart/checkout")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<CreateRazorpayOrderResponse> createOrder(
            Authentication authentication) {

        String customerId = authentication.getName();

        return ResponseEntity.ok(
                paymentService.createOrder(customerId)
        );
    }

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyPayment(
            @RequestHeader("Authorization") String authorizationHeader,
            Authentication authentication,
            @Valid @RequestBody VerifyPaymentRequest request) {

        String customerId = authentication.getName();

        paymentService.verifyPayment(
                customerId,
                authorizationHeader,
                request
        );

        return ResponseEntity.ok().build();
    }
}