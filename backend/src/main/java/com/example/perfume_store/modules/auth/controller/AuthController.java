package com.example.perfume_store.modules.auth.controller;


import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.auth.dto.request.LoginRequestDTO;
import com.example.perfume_store.modules.auth.dto.request.RegisterRequestDTO;
import com.example.perfume_store.modules.auth.service.AuthService;
import com.example.perfume_store.modules.auth.security.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private AuthenticationManager authenticationManager;
    private JwtService jwtService;
    private AuthService authService;

    // This is a mock endpoint, waiting for frontend
    @GetMapping("/home")
    public String mockHomePage() {
        return "Login Successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDTO loginRequestDTO,
            HttpServletRequest request
    ) {
        // This line calls loadUserByUsername, PasswordEncoder.matches(),
        // and also check UserDetails' default methods. After this method
        // we'll receive a valid user or an exception
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getUsername(),
                        loginRequestDTO.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) Objects.requireNonNull(authentication.getPrincipal());

        // Generate JWT token
        String token = jwtService.generateToken(userDetails);

        return ApiResponseFactory.success(token, "Login successfully", HttpStatus.OK, request);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody RegisterRequestDTO registerRequestDTO,
            HttpServletRequest request
    ) {
        boolean isCreated = authService.registerUser(registerRequestDTO);
        if (isCreated) {
            return ApiResponseFactory.success(true, "Register successfully", HttpStatus.OK, request);
        } else {
            return ApiResponseFactory.error(HttpStatus.BAD_REQUEST, "Register Failed", request);
        }
    }

    @PostMapping("/token")
    public ResponseEntity<?> login(
            HttpServletRequest request
    ) {
        String token = request.getHeader("Authorization").substring(7);

        boolean isValid = jwtService.isTokenValid(token);

        if (isValid) {
            return ApiResponseFactory.success(isValid, "Valid Token", HttpStatus.OK, request);
        } else {
            return ApiResponseFactory.success(isValid, "Invalid Token", HttpStatus.OK, request);
        }
    }
}

