package com.example.perfume_store.common.utils;

import com.example.perfume_store.common.response.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Instant;

public class ApiResponseFactory {

    public static <T> ResponseEntity<ApiResponse<T>> success(T data, String message, HttpStatus status, HttpServletRequest request) {
        ApiResponse<T> body = ApiResponse.<T>builder()
                .timestamp(Instant.now())
                .status(status.value())
                .path(request.getRequestURI())
                .data(data)
                .message(message)
                .error(null)
                .build();

        return ResponseEntity.status(status).body(body);
    }

    public static ResponseEntity<ApiResponse<Object>> error(HttpStatus status, String message, HttpServletRequest request) {
        ApiResponse<Object> body = ApiResponse.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .path(request.getRequestURI())
                .data(null)
                .message(message)
                .error(status.getReasonPhrase())
                .build();

        return ResponseEntity.status(status).body(body);
    }
}
