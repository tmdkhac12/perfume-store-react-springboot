package com.example.perfume_store.configs.security;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.auth.security.jwt.JwtAuthenticationFilter;
import com.example.perfume_store.modules.auth.security.jwt.JwtService;
import com.example.perfume_store.modules.auth.security.oauth2.CustomOAuth2Service;
import com.example.perfume_store.modules.auth.security.oauth2.CustomOAuth2SuccessHandler;
import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity   // For @PreAuthorize
public class SecurityConfig {

    private final String USER = "USER";
    private final String ADMIN = "ADMIN";

    private final CustomOAuth2Service customOAuth2Service;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) throws Exception {

        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))

                // Temporarily turn off CSRF Token for development
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization rules
                .authorizeHttpRequests(auth -> auth
                        // Address
                        .requestMatchers(HttpMethod.GET, "/api/v1/address/**").permitAll()

                        // Assistant
                        .requestMatchers(HttpMethod.POST, "/api/v1/bot/**").permitAll()

                        // Auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/login/**", "/oauth2/**").permitAll()

                        // Brands
                        .requestMatchers(HttpMethod.GET, "/api/v1/brands/**").permitAll()
                        .requestMatchers("/api/v1/brands/**").hasRole(ADMIN)

                        // Perfumes
                        .requestMatchers(HttpMethod.GET, "/api/v1/perfumes/**").permitAll()
                        .requestMatchers("/api/v1/perfumes/**").hasRole(ADMIN)

                        .requestMatchers("/api/v1/users/me").hasAnyRole(USER, ADMIN)
                        .requestMatchers("/api/v1/users/me/addresses/**").hasRole(USER)
                        .requestMatchers("/api/v1/admin/**").hasRole(ADMIN)
                        .anyRequest().authenticated()
                )

                // OAuth2 config
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2Service) // Register OAuth2 Service
                        )
                        .successHandler(customOAuth2SuccessHandler)
                )

                // Session config
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // Exception handling
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(authenticationEntryPoint())
                )

                // Disable default login form
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            // This is triggered only when accessing a protected endpoint without valid authentication.
            
            // Check if there was a specific JWT exception (e.g., expired or invalid token)
            String message = (String) request.getAttribute("jwt_exception_message");
            
            if (message == null) {
                // If no specific JWT error, it means the user simply didn't provide a token.
                message = "Full authentication is required to access this resource";
            }

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());

            ResponseEntity<?> responseEntity = ApiResponseFactory.error(HttpStatus.UNAUTHORIZED, message, request);
            mapper.writeValue(response.getWriter(), responseEntity.getBody());
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(jwtService, userDetailsService);
    }

}