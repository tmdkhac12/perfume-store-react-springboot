package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.configs.security.SecurityContextGetter;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import com.example.perfume_store.modules.user.service.UserSelfService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserSelfControllerTest {

    @Mock
    private UserSelfService userSelfService;

    @Mock
    private SecurityContextGetter securityContextGetter;

    @Mock
    private HttpServletRequest httpServletRequest;

    @InjectMocks
    private UserSelfController userSelfController;

    @Test
    @DisplayName("getSelfProfile: should get user id from SecurityContextGetter and call service")
    void getSelfProfile_ReturnsUserProfile() {
        int userId = 42;
        UserPublicResponseDTO dto = new UserPublicResponseDTO();
        dto.setId(userId);
        dto.setName("User");
        dto.setUsername("user");
        dto.setEmail("user@example.com");

        when(securityContextGetter.getUserId()).thenReturn(userId);
        when(userSelfService.getUserById(userId)).thenReturn(dto);

        ResponseEntity<?> result = userSelfController.getSelfProfile(httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(securityContextGetter).getUserId();
        verify(userSelfService).getUserById(userId);
    }
}

