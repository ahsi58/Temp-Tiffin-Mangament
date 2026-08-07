package com.tiffin.authservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.authservice.entity.Credential;
import com.tiffin.authservice.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	
	Optional<RefreshToken> findByCredential(Credential credential);
	
	void deleteByCredential(Credential credential);
	
	Optional<RefreshToken> findByToken(String token);
	
	Optional<RefreshToken> findByTokenAndRevokedFalse(String token);
}
