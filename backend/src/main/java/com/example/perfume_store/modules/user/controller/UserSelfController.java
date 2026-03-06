package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.configs.security.SecurityContextGetter;
import com.example.perfume_store.modules.user.service.UserSelfService;
import jakarta.servlet.http.HttpServletRequest;
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
}
