package com.tiffin.userservice.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthUserResponse {

    private Long authUserId;

    private String email;
}