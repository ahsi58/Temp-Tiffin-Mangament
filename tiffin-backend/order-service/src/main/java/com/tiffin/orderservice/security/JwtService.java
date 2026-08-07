package com.tiffin.orderservice.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.tiffin.orderservice.config.JwtProperties;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties jwtProperties;

    /**
     * Returns the signing key used for JWT verification.
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(
                jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8)
        );
    }

    /**
     * Extract all claims.
     */
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Extract email.
     */
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Extract role.
     */
    public String extractRole(String token) {
        return extractAllClaims(token)
                .get("role", String.class);
    }

    /**
     * Extract expiration.
     */
    public Date extractExpiration(String token) {
        return extractAllClaims(token)
                .getExpiration();
    }

    /**
     * Check token expiry.
     */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token)
                .before(new Date());
    }

    /**
     * Validate token.
     */
    public boolean isTokenValid(String token, String email) {
        String extractedEmail = extractEmail(token);
        return extractedEmail.equals(email)
                && !isTokenExpired(token);
    }
}