package com.tiffin.cartservice.client;

import com.tiffin.cartservice.dto.OrderResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "ORDER-SERVICE")
public interface OrderClient {


@PostMapping("/orders")
OrderResponse placeOrder(
        @RequestHeader("Authorization") String authorizationHeader
);


}
