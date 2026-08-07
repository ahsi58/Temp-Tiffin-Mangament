package com.tiffin.userservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.userservice.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByAuthUserId(Long authUserId);

	Optional<User> findByEmail(String email);

	boolean existsByAuthUserId(Long authUserId);

	boolean existsByEmail(String email);
}
