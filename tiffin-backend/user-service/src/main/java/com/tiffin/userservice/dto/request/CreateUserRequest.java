package com.tiffin.userservice.dto.request; //this dto accepts request from the auth service 
//client --> register --> auth-service --> createuserrequest dto --> user-service

//validations not added as validations are done when client sends data and this dto recieves resquest from auth-service that already does validations when data is accepted from client

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {

    private Long authUserId;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String email;
}