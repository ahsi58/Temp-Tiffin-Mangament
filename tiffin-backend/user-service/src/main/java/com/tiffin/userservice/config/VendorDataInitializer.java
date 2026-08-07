package com.tiffin.userservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.tiffin.userservice.client.AuthClient;
import com.tiffin.userservice.dto.response.AuthUserResponse;
import com.tiffin.userservice.entity.Vendor;
import com.tiffin.userservice.repository.VendorRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class VendorDataInitializer implements CommandLineRunner {

    private final VendorRepository vendorRepository;
    private final AuthClient authClient;

    @Override
    public void run(String... args) throws Exception {

        AuthUserResponse authVendor =
                authClient.getUserByEmail("vendor@tiffin.com");

        if (vendorRepository.existsByAuthUserId(authVendor.getAuthUserId())) {
            return;
        }

        Vendor vendor = Vendor.builder()
                .authUserId(authVendor.getAuthUserId())
                .businessName("Home Tiffin Service")
                .ownerName("Vendor Name")
                .email(authVendor.getEmail())
                .phoneNumber("9876543210")
                .address("Pune")
                .city("Pune")
                .state("Maharashtra")
                .pincode("411001")
                .acceptingOrders(true)
                .active(true)
                .build();

        vendorRepository.save(vendor);

        System.out.println("Default Vendor Profile Created.");
    }
}