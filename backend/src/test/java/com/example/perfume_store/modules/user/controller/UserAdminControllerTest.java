package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import com.example.perfume_store.modules.user.service.UserAdminService;
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
class UserAdminControllerTest {

    @Mock
    private UserAdminService userAdminService;

    @Mock
    private HttpServletRequest httpServletRequest;

    @InjectMocks
    private UserAdminController userAdminController;

    @Test
    @DisplayName("getPaginatedUsers: should call service with correct page and limit")
    void getPaginatedUsers_CallsServiceWithParams() {
        int page = 2;
        int limit = 10;
        PageResponse<UserAdminResponseDTO> response = new PageResponse<>();

        when(userAdminService.getPaginatedUsers(page, limit)).thenReturn(response);

        ResponseEntity<?> result = userAdminController.getPaginatedUsers(page, limit, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(userAdminService).getPaginatedUsers(page, limit);
    }

    @Test
    @DisplayName("getUserById: should call service with correct id")
    void getUserById_CallsServiceWithId() {
        int userId = 5;
        UserAdminResponseDTO dto = new UserAdminResponseDTO();
        dto.setId(userId);

        when(userAdminService.getUserById(userId)).thenReturn(dto);

        ResponseEntity<?> result = userAdminController.getUserById(userId, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(userAdminService).getUserById(userId);
    }

    @Test
    @DisplayName("adminCreateUser: should call service with DTO and return CREATED status")
    void adminCreateUser_CallsServiceAndReturnsCreated() {
        UserAdminCreateRequestDTO request = new UserAdminCreateRequestDTO();
        request.setName("Admin");
        request.setUsername("admin");

        UserAdminResponseDTO response = new UserAdminResponseDTO();
        response.setId(1);

        when(userAdminService.adminCreateUser(request)).thenReturn(response);

        ResponseEntity<?> result = userAdminController.adminCreateUser(request, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        verify(userAdminService).adminCreateUser(request);
    }

    @Test
    @DisplayName("adminUpdateUser: should call service with id and DTO")
    void adminUpdateUser_CallsServiceWithIdAndDTO() {
        int id = 3;
        UserAdminUpdateRequestDTO request = new UserAdminUpdateRequestDTO();
        request.setName("Updated");

        UserAdminResponseDTO response = new UserAdminResponseDTO();
        response.setId(id);

        when(userAdminService.adminUpdateUser(id, request)).thenReturn(response);

        ResponseEntity<?> result = userAdminController.adminUpdateUser(id, request, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(userAdminService).adminUpdateUser(id, request);
    }

    @Test
    @DisplayName("resetPassword: should call service with id")
    void resetPassword_CallsServiceWithId() {
        int id = 7;
        UserAdminResponseDTO response = new UserAdminResponseDTO();
        response.setId(id);

        when(userAdminService.resetUserPassword(id)).thenReturn(response);

        ResponseEntity<?> result = userAdminController.resetPassword(id, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(userAdminService).resetUserPassword(id);
    }
}

