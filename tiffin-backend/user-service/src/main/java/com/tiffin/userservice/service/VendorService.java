package com.tiffin.userservice.service;

import com.tiffin.userservice.dto.request.UpdateVendorRequest;
import com.tiffin.userservice.dto.response.VendorResponse;

public interface VendorService {

    VendorResponse getVendor(Long authUserId);

    VendorResponse updateVendor(Long authUserId,
                                UpdateVendorRequest request);
}