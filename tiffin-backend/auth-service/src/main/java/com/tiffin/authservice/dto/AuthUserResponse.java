package com.tiffin.authservice.dto;

import com.tiffin.authservice.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthUserResponse {

    private Long authUserId;

    private String email;

    private Role role;
}