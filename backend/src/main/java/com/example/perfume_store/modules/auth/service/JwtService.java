package com.example.perfume_store.modules.auth.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.expiration}")
    private long EXPIRATION;

    private final SecretKey SECRET_KEY;

    public JwtService(@Value("${jwt.secret}") String secret) {
        SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secret));
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Function to verify if the token is real, does it be modified?
     */
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(SECRET_KEY) // Set secret key to verify signature
                .build()
                .parseSignedClaims(token)   // Verify the token, parse it and check expiration
                .getPayload();
    }

    public String getUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String getUsername(Claims claims) {
        return claims.getSubject();
    }

    private boolean isExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private boolean isExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    /**
     * Function to verify if the token is real and it isn't expired
     */
    public boolean isTokenValid(String token) {
        Claims claims = extractAllClaims(token);
        return claims != null;
    }

    public boolean isTokenValid(Claims claims) {
        return claims != null;
    }
}
