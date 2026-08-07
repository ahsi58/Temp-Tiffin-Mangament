package com.tiffin.userservice.service.impl;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tiffin.userservice.dto.request.CreateUserRequest;
import com.tiffin.userservice.dto.request.UpdateUserRequest;
import com.tiffin.userservice.dto.response.UserResponse;
import com.tiffin.userservice.entity.User;
import com.tiffin.userservice.exception.UserAlreadyExistsException;
import com.tiffin.userservice.exception.UserNotFoundException;
import com.tiffin.userservice.mapper.UserMapper;
import com.tiffin.userservice.repository.UserRepository;
import com.tiffin.userservice.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void createUser(CreateUserRequest request) {

        if (userRepository.existsByAuthUserId(request.getAuthUserId())) {
            throw new UserAlreadyExistsException(
                    "User already exists with Auth User ID: " + request.getAuthUserId());
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(
                    "User already exists with email: " + request.getEmail());
        }

        User user = UserMapper.toEntity(request);

        userRepository.save(user);
    }

    @Override
    public UserResponse getUserByAuthUserId(Long authUserId) {
    		User user = userRepository.findByAuthUserId(authUserId).orElseThrow(()-> new UserNotFoundException("User not found with authuserId: "+authUserId));
    		
        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponse updateProfile(Long authUserId, UpdateUserRequest request) {
    		User user = userRepository.findByAuthUserId(authUserId).orElseThrow(()-> new UserNotFoundException("User not found of auth User Id: "+authUserId));
    		
    		//mapping from UpdateUserRequest dto to User entity
    		UserMapper.updateEntity(user, request);
    		  		
    		User updatedUser = userRepository.save(user);
    		
    		return UserMapper.toResponse(updatedUser);
    }
}