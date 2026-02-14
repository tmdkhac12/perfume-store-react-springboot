package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.user.service.UserSelfService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users/me")
@AllArgsConstructor
@Validated
public class UserSelfController {

    private final UserSelfService userSelfService;

    @GetMapping
    public ResponseEntity<?> getSelfProfile(HttpServletRequest request) {
        var selfProfile = userSelfService.getUserById(1);
        return ApiResponseFactory.success(selfProfile, "Get User's Profile Successfully", HttpStatus.OK, request);
    }
}
