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
        RegisterRequestDTO dto = createRegisterRequest("password123", "password123");
        User mapped = new User();
        when(authMapper.toEntity(dto)).thenReturn(mapped);
        when(passwordEncoder.encode(org.mockito.ArgumentMatchers.anyString())).thenReturn("hashed");

        boolean result = authService.registerUser(dto);

        assertThat(result).isTrue();
        verify(userRepository).save(mapped);
    }

    @Test
    @DisplayName("registerUser: password mismatch throws IllegalArgumentException")
    void registerUser_passwordMismatch() {
        RegisterRequestDTO dto = createRegisterRequest("a", "b");

        assertThatThrownBy(() -> authService.registerUser(dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Password & confirm password");
    }

    @Test
    @DisplayName("registerUser: duplicate user save propagates exception")
    void registerUser_duplicateUser_throws() {
        RegisterRequestDTO dto = createRegisterRequest("password123", "password123");
        User mapped = new User();
        when(authMapper.toEntity(dto)).thenReturn(mapped);
        when(passwordEncoder.encode(org.mockito.ArgumentMatchers.anyString())).thenReturn("hashed");
        when(userRepository.save(mapped)).thenThrow(new RuntimeException("duplicate key"));

        assertThatThrownBy(() -> authService.registerUser(dto))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("duplicate");
    }

    // Factory helper method
    private RegisterRequestDTO createRegisterRequest(String password, String confirmPassword) {
        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setPassword(password);
        dto.setConfirmPassword(confirmPassword);
        return dto;
    }
}


