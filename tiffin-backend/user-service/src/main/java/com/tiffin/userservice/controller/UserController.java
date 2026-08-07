package com.tiffin.userservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.tiffin.userservice.dto.request.CreateUserRequest;
import com.tiffin.userservice.dto.request.UpdateUserRequest;
import com.tiffin.userservice.dto.response.ApiResponse;
import com.tiffin.userservice.dto.response.UserResponse;
import com.tiffin.userservice.security.AuthenticatedUser;
import com.tiffin.userservice.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;

	
	//1....create user authservive --> userservice
	@PostMapping
	public ResponseEntity<ApiResponse> createUser(
	        @RequestBody CreateUserRequest request) {

	    userService.createUser(request);

	    System.out.println("Inside createUser()");
	    
	    ApiResponse response = ApiResponse.builder()
	            .success(true)
	            .message("Profile created successfully.")
	            .build();

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body(response);
	}
	
	//2....get user profile client --> userService
	@GetMapping("/{authUserId}")
	public ResponseEntity<UserResponse> getUser(
	        @PathVariable Long authUserId) {

	    return ResponseEntity.ok(
	            userService.getUserByAuthUserId(authUserId));
	}
	
	//endpoint after adding jwt authentication i.e. only the authentic user can access this endpoint
	//@AuthenticationPrincipal --> gets the object stored in SecurityContextHolder
	@GetMapping("/me")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<UserResponse> getMyProfile(
	        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {

	    UserResponse response =
	            userService.getUserByAuthUserId(
	                    authenticatedUser.getAuthUserId());

	    return ResponseEntity.ok(response);
	}
	
	//3....put update user profile --> UserService
	@PutMapping("/{authUserId}")
	public ResponseEntity<UserResponse> updateUser(
	        @PathVariable Long authUserId,
	        @Valid @RequestBody UpdateUserRequest request) {

	    return ResponseEntity.ok(
	            userService.updateProfile(authUserId, request));
	}
	
	//endpoint after adding jwt authentication i.e. only the authentic user can access this endpoint
	@PutMapping("/me")
	@PreAuthorize("hasRole('CUSTOMER')")
	public ResponseEntity<UserResponse> updateProfile(
	        @AuthenticationPrincipal AuthenticatedUser authenticatedUser,
	        @Valid @RequestBody UpdateUserRequest request) {

	    UserResponse response = userService.updateProfile(
	            authenticatedUser.getAuthUserId(),
	            request);

	    return ResponseEntity.ok(response);
	}
}