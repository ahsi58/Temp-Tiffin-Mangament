package com.tiffin.userservice.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VendorResponse {

    private Long id;

    private Long authUserId;

    private String businessName;

    private String ownerName;

    private String email;

    private String phoneNumber;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String profileImage;

    private String upiId;

    private Boolean acceptingOrders;

    private Boolean active;
}