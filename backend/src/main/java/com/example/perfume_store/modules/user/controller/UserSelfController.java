package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.configs.security.SecurityContextGetter;
import com.example.perfume_store.modules.user.dtos.request.UserPasswordUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserProfileUpdateRequestDTO;
import com.example.perfume_store.modules.user.service.UserSelfService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/me")
@AllArgsConstructor
public class UserSelfController {

    private final UserSelfService userSelfService;
    private final SecurityContextGetter securityContextGetter;

    @GetMapping
    public ResponseEntity<?> getSelfProfile(HttpServletRequest request) {
        int userId = securityContextGetter.getUserId();

        var selfProfile = userSelfService.getUserById(userId);
        return ApiResponseFactory.success(selfProfile, "Get user's profile successfully", HttpStatus.OK, request);
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> updateSelfProfile(@Valid @RequestBody UserProfileUpdateRequestDTO dto, HttpServletRequest request) {
        int userId = securityContextGetter.getUserId();

        var updatedProfile = userSelfService.updateProfile(userId, dto);
        return ApiResponseFactory.success(updatedProfile, "Update profile successfully", HttpStatus.OK, request);
    }

    @PatchMapping("/password")
    public ResponseEntity<?> updateSelfPassword(@Valid @RequestBody UserPasswordUpdateRequestDTO dto, HttpServletRequest request) {
        int userId = securityContextGetter.getUserId();

        userSelfService.updatePassword(userId, dto);
        return ApiResponseFactory.success(null, "Update password successfully", HttpStatus.OK, request);
    }
}
