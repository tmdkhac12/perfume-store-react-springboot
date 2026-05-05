package com.example.perfume_store.configs.security;

import com.example.perfume_store.modules.auth.security.oauth2.CustomOAuth2SuccessHandler;
import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;
import com.example.perfume_store.modules.auth.security.jwt.JwtAuthenticationFilter;
import com.example.perfume_store.modules.auth.security.oauth2.CustomOAuth2Service;
import com.example.perfume_store.modules.auth.security.jwt.JwtService;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
                // Temporarily turn off CSRF Token for development
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization rules
                .authorizeHttpRequests(auth -> auth
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

                // Disable default login form
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
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

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/**") // Chỉ cho phép các đường dẫn bắt đầu bằng /api/
                        .allowedOrigins("http://localhost:5173") // URL của Frontend (Vite mặc định là 5173)
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}