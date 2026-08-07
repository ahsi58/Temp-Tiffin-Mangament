package com.tiffin.userservice.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tiffin.userservice.dto.request.UpdateVendorRequest;
import com.tiffin.userservice.dto.response.VendorResponse;
import com.tiffin.userservice.entity.Vendor;
import com.tiffin.userservice.exception.UserNotFoundException;
import com.tiffin.userservice.mapper.VendorMapper;
import com.tiffin.userservice.repository.VendorRepository;
import com.tiffin.userservice.service.VendorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;

    @Override
    @Transactional(readOnly = true)
    public VendorResponse getVendor(Long authUserId) {

        Vendor vendor = vendorRepository.findByAuthUserId(authUserId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "Vendor not found with auth user id : " + authUserId));

        return VendorMapper.toResponse(vendor);
    }

    @Override
    public VendorResponse updateVendor(Long authUserId,
                                       UpdateVendorRequest request) {

        Vendor vendor = vendorRepository.findByAuthUserId(authUserId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "Vendor not found with auth user id : " + authUserId));

        VendorMapper.updateEntity(vendor, request);

        Vendor updatedVendor = vendorRepository.save(vendor);

        return VendorMapper.toResponse(updatedVendor);
    }
}