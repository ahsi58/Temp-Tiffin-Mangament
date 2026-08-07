package com.tiffin.userservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.tiffin.userservice.dto.request.UpdateVendorRequest;
import com.tiffin.userservice.dto.response.VendorResponse;
import com.tiffin.userservice.entity.Role;
import com.tiffin.userservice.security.AuthenticatedUser;
import com.tiffin.userservice.service.VendorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/vendors")
@RequiredArgsConstructor
@Validated
public class VendorController {

    private final VendorService vendorService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<VendorResponse> getVendorProfile(
            Authentication authentication) {

        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();
        
        System.out.println(authentication.getAuthorities());
        
        return ResponseEntity.ok(
                vendorService.getVendor(user.getAuthUserId()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('VENDOR')")
    public ResponseEntity<VendorResponse> updateVendorProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateVendorRequest request) {

        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        return ResponseEntity.ok(
                vendorService.updateVendor(
                        user.getAuthUserId(),
                        request));
    }
}