package com.tiffin.authservice.security;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getServletPath();

        return path.startsWith("/auth/login")
                || path.startsWith("/auth/register")
                || path.startsWith("/auth/refresh")
                || path.startsWith("/auth/logout");
    }
    
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String authHeader = request.getHeader("Authorization");
		
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
		    filterChain.doFilter(request, response);
		    return;
		}
		
		String jwt = authHeader.substring(7);
		try {
			String email = jwtService.extractEmail(jwt);
			
			//checks if the token is not already authenticated
			if (email != null
			        && SecurityContextHolder.getContext().getAuthentication() == null) {
	
			    UserDetails userDetails =
			            customUserDetailsService.loadUserByUsername(email);
	
			    if (jwtService.isTokenValid(jwt, userDetails.getUsername())) {
	
			    		//creating authenticated authentication object to store in SecurityContextHolder 
			        UsernamePasswordAuthenticationToken authentication =
			                new UsernamePasswordAuthenticationToken(
			                        userDetails,
			                        null,
			                        userDetails.getAuthorities()
			                );
	
			        authentication.setDetails(
			                new WebAuthenticationDetailsSource()
			                        .buildDetails(request)
			        );
	
			        SecurityContextHolder.getContext()
			                .setAuthentication(authentication);
			    }
			}
		}catch(Exception e) {
			logger.error("JWT Authentication failed", e);
		}
		filterChain.doFilter(request, response);
	}

}
