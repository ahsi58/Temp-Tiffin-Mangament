package com.tiffin.authservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.tiffin.authservice.client.dto.CreateUserRequest;
import com.tiffin.authservice.dto.ApiResponse;

@FeignClient(name = "USER-SERVICE")
public interface UserClient {

    @PostMapping("/users")
    ApiResponse createUser(@RequestBody CreateUserRequest request);

}