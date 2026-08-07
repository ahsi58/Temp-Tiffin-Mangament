package com.tiffin.userservice.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.userservice.dto.response.AuthUserResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final AuthClient authClient;

    @GetMapping("/vendor")
    public AuthUserResponse test() {
        return authClient.getUserByEmail("vendor@tiffin.com");
    }
}