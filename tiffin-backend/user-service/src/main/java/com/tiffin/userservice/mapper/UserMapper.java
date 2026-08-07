package com.tiffin.userservice.mapper;

import com.tiffin.userservice.dto.request.CreateUserRequest;
import com.tiffin.userservice.dto.request.UpdateUserRequest;
import com.tiffin.userservice.dto.response.UserResponse;
import com.tiffin.userservice.entity.User;

//Why final? --> Nobody should extend a mapper. It's simply a utility class.
public final class UserMapper {

    private UserMapper() {
        // Prevent instantiation
    }

    //mapping from CreateUserRequest dto to User entity
    public static User toEntity(CreateUserRequest request) {

        return User.builder()
                .authUserId(request.getAuthUserId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .build();
    }

  //mapping from User entity to UserResponse dto
    public static UserResponse toResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .authUserId(user.getAuthUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .city(user.getCity())
                .state(user.getState())
                .pincode(user.getPincode())
                .profileImage(user.getProfileImage())
                .build();
    }
    
    //mapping from UpdateUserRequest dto to User entity
    public static void updateEntity(User user, UpdateUserRequest request) {

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPincode(request.getPincode());
        user.setProfileImage(request.getProfileImage());

    }
}