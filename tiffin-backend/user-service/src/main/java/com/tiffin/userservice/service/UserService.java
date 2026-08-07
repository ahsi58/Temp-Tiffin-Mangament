package com.tiffin.userservice.service;

import com.tiffin.userservice.dto.request.CreateUserRequest;
import com.tiffin.userservice.dto.request.UpdateUserRequest;
import com.tiffin.userservice.dto.response.UserResponse;

public interface UserService {

	void createUser(CreateUserRequest request);

    UserResponse getUserByAuthUserId(Long authUserId);

    UserResponse updateProfile(Long authUserId,
                            UpdateUserRequest request);

}