package com.tiffin.userservice.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.tiffin.userservice.entity.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	@Value("${jwt.secret}")
	private String secret;
	
	private SecretKey getSigningKey() {
	    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	}
	
	private Claims extractAllClaims(String token) {

	    return Jwts.parser()
	            .verifyWith(getSigningKey())
	            .build()
	            .parseSignedClaims(token)
	            .getPayload();
	}
	
	public String extractEmail(String token) {
	    return extractAllClaims(token).getSubject();
	}
	
	public Long extractAuthUserId(String token) {

	    return extractAllClaims(token)
	            .get("authUserId", Long.class);
	}
	
	public Role extractRole(String token) {

	    return Role.valueOf(
	            extractAllClaims(token)
	                    .get("role", String.class)
	    );
	}
	
	public boolean isTokenValid(String token) {

	    try {

	        Claims claims = extractAllClaims(token);

	        return claims.getExpiration().after(new Date());

	    } catch (Exception ex) {

	        return false;
	    }
	}
}
