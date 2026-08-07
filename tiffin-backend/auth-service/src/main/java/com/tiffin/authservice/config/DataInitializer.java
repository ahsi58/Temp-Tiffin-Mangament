package com.tiffin.authservice.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.tiffin.authservice.entity.Credential;
import com.tiffin.authservice.entity.Role;
import com.tiffin.authservice.repository.CredentialRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CredentialRepository credentialRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (credentialRepository.existsByEmail("vendor@tiffin.com")) {
            return;
        }

        Credential vendor = Credential.builder()
                .email("vendor@tiffin.com")
                .password(passwordEncoder.encode("Vendor@123"))
                .role(Role.VENDOR)
                .build();

        credentialRepository.save(vendor);

        System.out.println("Default Vendor Account Created.");
    }
}