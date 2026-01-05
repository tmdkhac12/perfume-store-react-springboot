package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    // Completed
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
        var paginatedUsers = userService.getPaginatedUsers(page, limit);
        return ApiResponseFactory.success(paginatedUsers, "Get all users successfully", HttpStatus.OK, request);
    }

    /**
     * All the methods below have just completed a part (for Admin only)
     * waiting for the auth service to complete to continue development
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id, HttpServletRequest request) {
        var user = userService.getUserById(id);
        return ApiResponseFactory.success(user, "User retrieved", HttpStatus.OK, request);
    }

}
