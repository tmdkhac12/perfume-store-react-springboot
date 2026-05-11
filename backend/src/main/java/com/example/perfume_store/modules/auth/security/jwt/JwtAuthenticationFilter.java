package com.example.perfume_store.modules.auth.security.jwt;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NullMarked;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    @NullMarked
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            String token = getJwtToken(request);

            if (token != null) {
                try {
                    Claims claims = jwtService.extractAllClaims(token);

                    if (jwtService.isTokenValid(claims)) {
                        String username = jwtService.getUsername(claims);

                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        Authentication authentication = new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                } catch (ExpiredJwtException e) {
                    log.warn("JWT expired: {}", e.getMessage());
                    // Instead of blocking the request immediately, store the error message in the request attribute.
                    // This allows the request to reach permitAll() endpoints.
                    request.setAttribute("jwt_exception_message", "Token expired");
                } catch (MalformedJwtException | UnsupportedJwtException | SignatureException e) {
                    log.warn("JWT invalid: {}", e.getMessage());
                    request.setAttribute("jwt_exception_message", "Token invalid");
                }
            }

            // Continue the filter chain without setting the authentication if token is missing or invalid.
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("Authentication internal error: ", e);
            handleException(response, request, "Authentication failed");
        }
    }

    private void handleException(HttpServletResponse response, HttpServletRequest request, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

        ResponseEntity<?> responseEntity = ApiResponseFactory.error(HttpStatus.UNAUTHORIZED, message, request);
        mapper.writeValue(response.getWriter(), responseEntity.getBody());
    }

    private String getJwtToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }

        return null;
    }
}
