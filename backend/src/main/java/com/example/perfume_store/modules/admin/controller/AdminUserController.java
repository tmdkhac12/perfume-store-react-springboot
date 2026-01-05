package com.example.perfume_store.modules.admin.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.admin.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.admin.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.admin.service.AdminUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@AllArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @PostMapping
    public ResponseEntity<?> adminCreateUser(
            @Valid @RequestBody UserAdminCreateRequestDTO userAdminCreateRequestDTO,
            HttpServletRequest request) {
        var createdUser = adminUserService.adminCreateUser(userAdminCreateRequestDTO);
        return ApiResponseFactory.success(createdUser, "User created with a default password", HttpStatus.CREATED, request);
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<?> resetPassword(
            @PathVariable int id,
            HttpServletRequest request
    ) {
        var userAfterReset = adminUserService.resetUserPassword(id);
        return ApiResponseFactory.success(userAfterReset, "User password reset to default", HttpStatus.OK, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> adminUpdateUser(
            @PathVariable int id,
            @Valid @RequestBody UserAdminUpdateRequestDTO userAdminUpdateRequestDTO,
            HttpServletRequest request
    ) {
        var updatedUser = adminUserService.adminUpdateUser(id, userAdminUpdateRequestDTO);
        return ApiResponseFactory.success(updatedUser, "User updated", HttpStatus.OK, request);
    }
}
