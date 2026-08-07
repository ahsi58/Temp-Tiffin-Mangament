package com.tiffin.authservice.service;

import com.tiffin.authservice.dto.ApiResponse;
import com.tiffin.authservice.dto.AuthResponse;
import com.tiffin.authservice.dto.AuthUserResponse;
import com.tiffin.authservice.dto.LoginRequest;
import com.tiffin.authservice.dto.RefreshTokenRequest;
import com.tiffin.authservice.dto.RegisterRequest;

public interface AuthService {

    ApiResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);

    ApiResponse logout(String refreshToken);
    
    AuthUserResponse getUserByEmail(String email);
}