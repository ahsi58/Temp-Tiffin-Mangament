package com.tiffin.authservice.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tiffin.authservice.client.UserClient;
import com.tiffin.authservice.config.JwtProperties;
import com.tiffin.authservice.dto.ApiResponse;
import com.tiffin.authservice.dto.AuthResponse;
import com.tiffin.authservice.dto.AuthUserResponse;
import com.tiffin.authservice.dto.LoginRequest;
import com.tiffin.authservice.dto.RefreshTokenRequest;
import com.tiffin.authservice.dto.RegisterRequest;
import com.tiffin.authservice.entity.Credential;
import com.tiffin.authservice.entity.RefreshToken;
import com.tiffin.authservice.entity.Role;
import com.tiffin.authservice.exception.EmailAlreadyExistsException;
import com.tiffin.authservice.exception.InvalidTokenException;
import com.tiffin.authservice.exception.PasswordMismatchException;
import com.tiffin.authservice.exception.ResourceNotFoundException;
import com.tiffin.authservice.exception.UserProfileCreationException;
import com.tiffin.authservice.repository.CredentialRepository;
import com.tiffin.authservice.repository.RefreshTokenRepository;
import com.tiffin.authservice.security.JwtService;
import com.tiffin.authservice.service.AuthService;

import feign.FeignException;

import com.tiffin.authservice.client.dto.CreateUserRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final CredentialRepository credentialRepository;

	private final RefreshTokenRepository refreshTokenRepository;

	private final PasswordEncoder passwordEncoder;

	private final JwtService jwtService;
	
	private final JwtProperties jwtProperties;
	
	private final UserClient userClient;

	private final AuthenticationManager authenticationManager;

	//register user(customer)
    @Override
    public ApiResponse register(RegisterRequest request) {
    	
    		//checks if password and confirm password is same
	    	if (!request.getPassword().equals(request.getConfirmPassword())) {
	    	    throw new PasswordMismatchException("Passwords do not match");
	    	}
	    	//checks if email is unique
	    	if (credentialRepository.findByEmail(request.getEmail()).isPresent()) {
	    	    throw new EmailAlreadyExistsException("Email already registered");
	    	}
	    	
	    	String encodedPassword =
	    	        passwordEncoder.encode(request.getPassword());
	    	
	    	Credential credential = Credential.builder()
	    	        .email(request.getEmail())
	    	        .password(encodedPassword)
	    	        .role(Role.CUSTOMER)
	    	        .enabled(true)
	    	        .build();
	    	
	    	Credential savedCredential = credentialRepository.save(credential);
	    	
	    	CreateUserRequest createUserRequest =
	    	        CreateUserRequest.builder()
	    	                .authUserId(savedCredential.getId())
	    	                .firstName(request.getFirstName())
	    	                .lastName(request.getLastName())
	    	                .email(request.getEmail())
	    	                .phoneNumber(request.getPhoneNumber())
	    	                .build();
	    	
	    	try {
	    	    userClient.createUser(createUserRequest);
	    	} catch (FeignException ex) {

	    	    credentialRepository.deleteById(savedCredential.getId());

	    	    ex.printStackTrace();   // Temporary

	    	    throw new UserProfileCreationException(
	    	        "Unable to create user profile. Registration rolled back.");
	    	}
	    	
	    	return ApiResponse.builder()
	    	        .success(true)
	    	        .message("Registration successful. Please login.")
	    	        .build();
    }

    //login method
    @Override
    public AuthResponse login(LoginRequest request) {
    	
    		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
    	                request.getEmail(),
    	                request.getPassword()
    					)
    				);
    		
    		Credential credential = credentialRepository
    		        .findByEmail(request.getEmail())
    		        .orElseThrow(() ->
    		                new ResourceNotFoundException("User not found"));
        
        String accessToken =
                jwtService.generateAccessToken(credential.getId(), credential.getEmail(), credential.getRole());
        
        String refreshToken =
                jwtService.generateRefreshToken(credential.getEmail());
        
        RefreshToken refreshTokenEntity = refreshTokenRepository
                .findByCredential(credential)
                .orElse(new RefreshToken());

        refreshTokenEntity.setCredential(credential);
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setExpiryDate(LocalDateTime.now().plusDays(7));
        refreshTokenEntity.setRevoked(false);

        refreshTokenRepository.save(refreshTokenEntity);
        
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtProperties.getAccessTokenExpiration())
                .role(credential.getRole())
                .build();
    }

    //method to generate new access token from existing refresh token
    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {

        // Find refresh token
        RefreshToken refreshTokenEntity = refreshTokenRepository
                .findByTokenAndRevokedFalse(request.getRefreshToken())
                .orElseThrow(() ->
                        new InvalidTokenException("Invalid refresh token"));

        // Check expiry stored in database
        if (refreshTokenEntity.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException("Refresh token has expired");
        }

        // Extract email from JWT
        String email = jwtService.extractEmail(request.getRefreshToken());

        // Find credential
        Credential credential = credentialRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // Validate JWT
        if (!jwtService.isTokenValid(request.getRefreshToken(), credential.getEmail())) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        // Generate new tokens
        String newAccessToken = jwtService.generateAccessToken(
        			credential.getId(),
                credential.getEmail(),
                credential.getRole());

        String newRefreshToken = jwtService.generateRefreshToken(
                credential.getEmail());

        // Rotate refresh token
        refreshTokenEntity.setToken(newRefreshToken);
        refreshTokenEntity.setExpiryDate(
                LocalDateTime.now().plusSeconds(
                        jwtProperties.getRefreshTokenExpiration() / 1000
                )
        );
        refreshTokenEntity.setRevoked(false);

        refreshTokenRepository.save(refreshTokenEntity);

        // Return response
        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .expiresIn(jwtProperties.getAccessTokenExpiration())
                .role(credential.getRole())
                .build();
    }

    @Override
    public ApiResponse logout(String refreshToken) {

        RefreshToken refreshTokenEntity = refreshTokenRepository
                .findByTokenAndRevokedFalse(refreshToken)
                .orElseThrow(() ->
                        new InvalidTokenException("Invalid refresh token"));

        refreshTokenEntity.setRevoked(true);

        refreshTokenRepository.save(refreshTokenEntity);

        return ApiResponse.builder()
                .success(true)
                .message("Logout successful")
                .build();
    }
    
    @Override
    public AuthUserResponse getUserByEmail(String email) {

        Credential credential = credentialRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with email : " + email));

        return AuthUserResponse.builder()
                .authUserId(credential.getId())
                .email(credential.getEmail())
                .role(credential.getRole())
                .build();
    }
}
