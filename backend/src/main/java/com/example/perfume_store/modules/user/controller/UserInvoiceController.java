package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.configs.security.SecurityContextGetter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.perfume_store.modules.user.service.UserInvoiceService;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users/me/invoices")
@Validated
public class UserInvoiceController {

    private final UserInvoiceService userInvoiceService;
    private final SecurityContextGetter securityContextGetter;

    @GetMapping
    public ResponseEntity<?> getMe(
            @RequestParam(defaultValue = "1")
            @Min(value = 1, message = "Page number must be greater than 1")
            int page,

            @RequestParam(defaultValue = "8")
            @Min(value = 1, message = "Page limit must be greater than 1")
            @Max(value = 100, message = "Page limit must be smaller than 100")
            int limit,

            HttpServletRequest request
    ) {
        int userId = securityContextGetter.getUserId();
        var invoices = userInvoiceService.getInvoicesByUserId(userId, page, limit);
        return ApiResponseFactory.success(invoices, "Get my invoices successfully", HttpStatus.OK, request);
    }
}

