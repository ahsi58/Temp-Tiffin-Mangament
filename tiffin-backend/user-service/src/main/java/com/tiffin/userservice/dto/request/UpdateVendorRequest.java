package com.tiffin.userservice.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateVendorRequest {

    @Size(max = 100)
    private String businessName;

    @Size(max = 100)
    private String ownerName;

    @Size(max = 15)
    private String phoneNumber;

    private String address;

    @Size(max = 50)
    private String city;

    @Size(max = 50)
    private String state;

    @Size(max = 10)
    private String pincode;

    private String profileImage;

    private String upiId;

    private Boolean acceptingOrders;
}