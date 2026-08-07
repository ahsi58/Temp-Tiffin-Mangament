package com.tiffin.authservice.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.tiffin.authservice.entity.Credential;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final Credential credential;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority("ROLE_" + credential.getRole().name())
        );
    }

    @Override
    public String getPassword() {
        return credential.getPassword();
    }

    @Override
    public String getUsername() {
        return credential.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return credential.getEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return credential.getEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credential.getEnabled();
    }

    @Override
    public boolean isEnabled() {
        return credential.getEnabled();
    }

    public Long getCredentialId() {
        return credential.getId();
    }

    public String getRole() {
        return credential.getRole().name();
    }
}