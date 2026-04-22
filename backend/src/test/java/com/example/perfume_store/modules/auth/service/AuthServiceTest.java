package com.example.perfume_store.modules.auth.service;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.auth.dto.request.RegisterRequestDTO;
import com.example.perfume_store.modules.auth.mapper.AuthMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthMapper authMapper;

    @InjectMocks
    private AuthService authService;

    @Test
    @DisplayName("registerUser: success path saves user and returns true")
    void registerUser_success() {
        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setPassword("password123");
        dto.setConfirmPassword("password123");

        User mapped = new User();
        when(authMapper.toEntity(dto)).thenReturn(mapped);
        when(passwordEncoder.encode("password123")).thenReturn("hashed");

        boolean result = authService.registerUser(dto);

        assertThat(result).isTrue();
        verify(userRepository).save(mapped);
    }

    @Test
    @DisplayName("registerUser: password mismatch throws IllegalArgumentException")
    void registerUser_passwordMismatch() {
        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setPassword("a");
        dto.setConfirmPassword("b");

        assertThatThrownBy(() -> authService.registerUser(dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Password & confirm password");
    }
}

