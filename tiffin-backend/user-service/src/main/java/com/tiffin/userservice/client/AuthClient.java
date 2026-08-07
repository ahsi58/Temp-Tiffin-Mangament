package com.tiffin.userservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tiffin.userservice.dto.response.AuthUserResponse;

@FeignClient(name = "AUTH-SERVICE")
public interface AuthClient {

    @GetMapping("/auth/internal/user")
    AuthUserResponse getUserByEmail(@RequestParam String email);

}