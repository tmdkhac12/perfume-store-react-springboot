package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.user.service.UserAdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@AllArgsConstructor
public class UserAdminController {

    private final UserAdminService userAdminService;

    @GetMapping
    public ResponseEntity<?> getPaginatedUsers(
            @RequestParam(defaultValue = "1")
            @Min(value = 1, message = "Page number must be greater than 1")
            int page,

            @RequestParam(defaultValue = "8")
            @Min(value = 1, message = "Page limit must be greater than 1")
            @Max(value = 100, message = "Page limit must be smaller than 100") int limit,

            HttpServletRequest request
    ) {
        var paginatedUsers = userAdminService.getPaginatedUsers(page, limit);
        return ApiResponseFactory.success(paginatedUsers, "Get all users successfully", HttpStatus.OK, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id, HttpServletRequest request) {
        var user = userAdminService.getUserById(id);
        return ApiResponseFactory.success(user, "User retrieved", HttpStatus.OK, request);
    }

    @PostMapping
    public ResponseEntity<?> adminCreateUser(
            @Valid @RequestBody UserAdminCreateRequestDTO userAdminCreateRequestDTO,
            HttpServletRequest request) {
        var createdUser = userAdminService.adminCreateUser(userAdminCreateRequestDTO);
        return ApiResponseFactory.success(createdUser, "User created with a default password", HttpStatus.CREATED, request);
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<?> resetPassword(
            @PathVariable int id,
            HttpServletRequest request
    ) {
        var userAfterReset = userAdminService.resetUserPassword(id);
        return ApiResponseFactory.success(userAfterReset, "User password reset to default", HttpStatus.OK, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> adminUpdateUser(
            @PathVariable int id,
            @Valid @RequestBody UserAdminUpdateRequestDTO userAdminUpdateRequestDTO,
            HttpServletRequest request
    ) {
        var updatedUser = userAdminService.adminUpdateUser(id, userAdminUpdateRequestDTO);
        return ApiResponseFactory.success(updatedUser, "User updated", HttpStatus.OK, request);
    }
}
