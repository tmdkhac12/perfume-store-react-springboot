package com.example.perfume_store.modules.auth.security.jwt;

import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.PrintWriter;
import java.io.StringWriter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;

    @SuppressWarnings("unused")
    @Mock
    private CustomUserDetailsService userDetailsService;

    @InjectMocks
    private JwtAuthenticationFilter filter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Test
    @DisplayName("doFilterInternal: calls filterChain.doFilter on normal flow")
    void doFilterInternal_callsChain() throws Exception {
        // Minimal skeleton: ensure filter does not block the chain in a normal path
        when(request.getHeader("Authorization")).thenReturn(null);

        filter.doFilterInternal(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
    }

    @Test
    @DisplayName("doFilterInternal: valid token sets SecurityContext and continues")
    void doFilterInternal_validToken_setsSecurityContext() throws Exception {
        // 1. Arrange
        String token = "valid-jwt-token";
        String username = "testuser";
        Claims mockClaims = io.jsonwebtoken.Jwts.claims().subject(username).build();

        // Reset SecurityContext to ensure a clean environment
        SecurityContextHolder.clearContext();

        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);

        // Stub đúng phương thức nhận vào String
        when(jwtService.extractAllClaims(token)).thenReturn(mockClaims);

        // Stub đúng phương thức nhận vào Claims (giống trong Filter gọi)
        when(jwtService.isTokenValid(mockClaims)).thenReturn(true);
        when(jwtService.getUsername(mockClaims)).thenReturn(username);

        UserDetails userDetails = createUserDetails(username);
        when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);

        // 2. Act
        filter.doFilterInternal(request, response, filterChain);

        // 3. Assert

        // Kiểm tra xem Authentication đã được lưu vào SecurityContext chưa
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assertThat(auth).isNotNull();
        assertThat(auth.getName()).isEqualTo(username);
        assertThat(auth.getAuthorities().toString())
                .isEqualTo(userDetails.getAuthorities().toString());

        // Kiểm tra FilterChain tiếp tục chạy
        verify(filterChain).doFilter(request, response);
    }

    @Test
    @DisplayName("doFilterInternal: invalid token sets 401 and prevents filterChain")
    void doFilterInternal_invalidToken_writesUnauthorizedResponse() throws Exception {
        // Arrange
        String token = "invalid";
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtService.extractAllClaims(token)).thenThrow(new io.jsonwebtoken.JwtException("bad"));

        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        when(response.getWriter()).thenReturn(printWriter);

        // Act
        filter.doFilterInternal(request, response, filterChain);

        // Assert
        verify(response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        verify(response).setContentType("application/json");

        String actualJson = stringWriter.toString().trim();
        assertThat(actualJson)
                .contains("\"error\":\"Unauthorized\"")
                .contains("\"message\":\"Invalid token\"")
                .contains("\"status\":401");

        verify(filterChain, never()).doFilter(any(), any());
    }

    // Factory helper method
    private org.springframework.security.core.userdetails.UserDetails createUserDetails(String username) {
        return new org.springframework.security.core.userdetails.User(
                username,
                "password",
                java.util.Collections.singletonList(
                        new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER")
                )
        );
    }
}
