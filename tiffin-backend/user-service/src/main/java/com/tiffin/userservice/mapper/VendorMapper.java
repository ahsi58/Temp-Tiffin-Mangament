package com.tiffin.userservice.mapper;

import com.tiffin.userservice.dto.request.UpdateVendorRequest;
import com.tiffin.userservice.dto.response.VendorResponse;
import com.tiffin.userservice.entity.Vendor;

public class VendorMapper {

    private VendorMapper() {
    }

    public static VendorResponse toResponse(Vendor vendor) {

        return VendorResponse.builder()
                .id(vendor.getId())
                .authUserId(vendor.getAuthUserId())
                .businessName(vendor.getBusinessName())
                .ownerName(vendor.getOwnerName())
                .email(vendor.getEmail())
                .phoneNumber(vendor.getPhoneNumber())
                .address(vendor.getAddress())
                .city(vendor.getCity())
                .state(vendor.getState())
                .pincode(vendor.getPincode())
                .profileImage(vendor.getProfileImage())
                .upiId(vendor.getUpiId())
                .acceptingOrders(vendor.getAcceptingOrders())
                .active(vendor.getActive())
                .build();
    }

    public static void updateEntity(Vendor vendor,
                                    UpdateVendorRequest request) {

        if (request.getBusinessName() != null)
            vendor.setBusinessName(request.getBusinessName());

        if (request.getOwnerName() != null)
            vendor.setOwnerName(request.getOwnerName());

        if (request.getPhoneNumber() != null)
            vendor.setPhoneNumber(request.getPhoneNumber());

        if (request.getAddress() != null)
            vendor.setAddress(request.getAddress());

        if (request.getCity() != null)
            vendor.setCity(request.getCity());

        if (request.getState() != null)
            vendor.setState(request.getState());

        if (request.getPincode() != null)
            vendor.setPincode(request.getPincode());

        if (request.getProfileImage() != null)
            vendor.setProfileImage(request.getProfileImage());

        if (request.getUpiId() != null)
            vendor.setUpiId(request.getUpiId());

        if (request.getAcceptingOrders() != null)
            vendor.setAcceptingOrders(request.getAcceptingOrders());
    }
}