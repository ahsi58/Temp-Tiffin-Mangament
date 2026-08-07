package com.tiffin.authservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileRequest {

    private Long credentialId;

    private String fullName;

    private String email;

    private String phoneNumber;
}