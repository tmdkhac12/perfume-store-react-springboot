package com.example.perfume_store.modules.auth.security.jwt;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.reflect.Field;
import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {

    @Test
    @DisplayName("generateToken and validate token roundtrip")
    void generateToken_returnsToken_and_isValid() throws Exception {
        // Create a strong secret key and encode as Base64URL to match JwtService expectations
        javax.crypto.SecretKey key = io.jsonwebtoken.security.Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        String secretBase64Url = Base64.getUrlEncoder().withoutPadding().encodeToString(key.getEncoded());

        JwtService jwtService = new JwtService(secretBase64Url);

        // EXPIRATION is injected via @Value; set via reflection for test stability
        Field expField = JwtService.class.getDeclaredField("EXPIRATION");
        expField.setAccessible(true);
        expField.setLong(jwtService, 24 * 60 * 60 * 1000L); // 1 day

        UserDetails user = new org.springframework.security.core.userdetails.User("john", "pwd", java.util.Collections.emptyList());

        String token = jwtService.generateToken(user);

        assertThat(token).isNotNull().isNotEmpty();

        // Extraction and validation
        io.jsonwebtoken.Claims claims = jwtService.extractAllClaims(token);
        assertThat(claims).isNotNull();
        assertThat(jwtService.getUsername(token)).isEqualTo("john");
        assertThat(jwtService.isTokenValid(token)).isTrue();
    }
}

