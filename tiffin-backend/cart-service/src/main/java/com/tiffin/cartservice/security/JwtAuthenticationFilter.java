package com.tiffin.cartservice.security;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;

	private static final Logger logger =
	        LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String authHeader = request.getHeader("Authorization");

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
		    filterChain.doFilter(request, response);
		    return;
		}

		String jwt = authHeader.substring(7);
		try {
			String email = jwtService.extractEmail(jwt);
			String role = jwtService.extractRole(jwt);

			if (email != null
			        && SecurityContextHolder.getContext().getAuthentication() == null
			        && jwtService.isTokenValid(jwt, email)) {

				var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

				UsernamePasswordAuthenticationToken authentication =
				        new UsernamePasswordAuthenticationToken(email, null, authorities);

			    authentication.setDetails(
			            new WebAuthenticationDetailsSource().buildDetails(request)
			    );

			    SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch(Exception e) {
			logger.error("JWT Authentication failed", e);
		}
		filterChain.doFilter(request, response);
	}
}