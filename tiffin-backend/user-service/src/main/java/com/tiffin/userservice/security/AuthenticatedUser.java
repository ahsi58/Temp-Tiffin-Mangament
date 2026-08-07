package com.tiffin.userservice.security;

import com.tiffin.userservice.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticatedUser {

    private Long authUserId;
    private String email;
    private Role role;
}
