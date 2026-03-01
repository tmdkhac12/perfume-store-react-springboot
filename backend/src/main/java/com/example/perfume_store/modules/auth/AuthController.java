package com.example.perfume_store.modules.auth;


import com.example.perfume_store.common.utils.ApiResponseFactory;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AuthRequest authRequest,
            HttpServletRequest request
    ) {
        // This line calls loadUserByUsername, PasswordEncoder.matches(),
        // and also check UserDetails' default methods. After this method
        // we'll receive a valid user or an exception
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        assert userDetails != null : "User details is null";
        String token = jwtService.generateToken(userDetails);

        return ApiResponseFactory.success(token, "Login successfully", HttpStatus.OK, request);
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

