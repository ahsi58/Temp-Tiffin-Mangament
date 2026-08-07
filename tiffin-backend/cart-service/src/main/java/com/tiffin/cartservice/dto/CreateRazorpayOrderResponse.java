package com.tiffin.cartservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateRazorpayOrderResponse {

    private String razorpayOrderId;
    private String razorpayKeyId;
    private long amount;       // in paise
    private String currency;
}