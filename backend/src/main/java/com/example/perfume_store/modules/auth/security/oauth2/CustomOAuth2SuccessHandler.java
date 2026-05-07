package com.example.perfume_store.modules.auth.security.oauth2;

import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;
import com.example.perfume_store.modules.auth.security.jwt.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NullMarked;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    @NullMarked // Make sure that all the parameters are not null
    // After OAuth2 log in successfully, this method is run
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) Objects.requireNonNull(authentication.getPrincipal());
        String email = oAuth2User.getAttribute("email");

        // Create JWT token
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtService.generateToken(userDetails);

        // Save JWT token in client's cookie
        Cookie jwtCookie = new Cookie("jwt_token", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");      // Apply for all domains
        jwtCookie.setMaxAge(24 * 60 * 60);
        response.addCookie(jwtCookie);

        // Redirect user
        getRedirectStrategy().sendRedirect(request, response, frontendUrl);
    }
}