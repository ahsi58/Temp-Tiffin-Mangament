package com.tiffin.userservice.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tiffin.userservice.entity.Role;

import io.jsonwebtoken.lang.Collections;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//Read the Header
		final String authHeader = request.getHeader("Authorization");
		
		//if token is absent
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
		    filterChain.doFilter(request, response);
		    return;
		}
		
		String jwt = authHeader.substring(7);
		
		if (!jwtService.isTokenValid(jwt)) {
		    filterChain.doFilter(request, response);
		    return;
		}
		
		//extract claims from valid token
		Long authUserId = jwtService.extractAuthUserId(jwt);
		String email = jwtService.extractEmail(jwt);
		Role role = jwtService.extractRole(jwt);
		
		AuthenticatedUser principal = new AuthenticatedUser(authUserId, email, role);
		
		if (SecurityContextHolder.getContext().getAuthentication() == null) {

			List<GrantedAuthority> authorities =
			        List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));

			UsernamePasswordAuthenticationToken authentication =
			        new UsernamePasswordAuthenticationToken(
			                principal,
			                null,
			                authorities);

		    authentication.setDetails(
		            new WebAuthenticationDetailsSource()
		                    .buildDetails(request));

		    SecurityContextHolder.getContext()
		            .setAuthentication(authentication);
		}
		
		filterChain.doFilter(request, response);
	}
}
