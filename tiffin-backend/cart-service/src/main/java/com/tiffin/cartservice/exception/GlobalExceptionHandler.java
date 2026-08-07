package com.tiffin.cartservice.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.MethodArgumentNotValidException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.tiffin.cartservice.dto.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(CartNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleCartNotFoundException(
	        CartNotFoundException ex,
	        HttpServletRequest request) {

	    ErrorResponse error = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.NOT_FOUND.value())
	            .error(HttpStatus.NOT_FOUND.getReasonPhrase())
	            .message(ex.getMessage())
	            .path(request.getRequestURI())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}

	@ExceptionHandler(CartItemNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleCartItemNotFoundException(
	        CartItemNotFoundException ex,
	        HttpServletRequest request) {

	    ErrorResponse error = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.NOT_FOUND.value())
	            .error(HttpStatus.NOT_FOUND.getReasonPhrase())
	            .message(ex.getMessage())
	            .path(request.getRequestURI())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
	        ResourceNotFoundException ex,
	        HttpServletRequest request) {

	    ErrorResponse error = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.NOT_FOUND.value())
	            .error(HttpStatus.NOT_FOUND.getReasonPhrase())
	            .message(ex.getMessage())
	            .path(request.getRequestURI())
	            .build();

	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}

	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<ErrorResponse> handleInvalidTokenException(
	        InvalidTokenException ex,
	        HttpServletRequest request) {

	    ErrorResponse error = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.UNAUTHORIZED.value())
	            .error(HttpStatus.UNAUTHORIZED.getReasonPhrase())
	            .message(ex.getMessage())
	            .path(request.getRequestURI())
	            .build();

	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleException(
	        Exception ex,
	        HttpServletRequest request) {

	    ErrorResponse error = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
	            .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
	            .message(ex.getMessage())
	            .path(request.getRequestURI())
	            .build();

	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(
	        MethodArgumentNotValidException ex,
	        HttpServletRequest request) {

	    Map<String, String> errors = new HashMap<>();
	    ex.getBindingResult().getFieldErrors().forEach(error ->
	            errors.put(error.getField(), error.getDefaultMessage())
	    );

	    ErrorResponse errorResponse = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.BAD_REQUEST.value())
	            .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
	            .message("Validation Failed")
	            .path(request.getRequestURI())
	            .validationErrors(errors)
	            .build();

	    return ResponseEntity.badRequest().body(errorResponse);
	}
	
	@ExceptionHandler(PaymentVerificationException.class)
	public ResponseEntity<ErrorResponse> handlePaymentVerificationException(
	        PaymentVerificationException ex,
	        HttpServletRequest request) {

	    ErrorResponse error = ErrorResponse.builder()
	            .timestamp(LocalDateTime.now())
	            .status(HttpStatus.BAD_REQUEST.value())
	            .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
	            .message(ex.getMessage())
	            .path(request.getRequestURI())
	            .build();

	    return ResponseEntity.badRequest().body(error);
	}
}