package com.example.perfume_store.modules.address.controller;

import com.example.perfume_store.common.utils.AddressValidator;
import com.example.perfume_store.common.utils.ApiResponseFactory;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/address")
public class AddressController {

    private final AddressValidator addressValidator;

    @GetMapping("/provinces")
    public ResponseEntity<?> getProvinces(HttpServletRequest request) {
        return ApiResponseFactory.success(
                addressValidator.getProvinceMap(),
                "Get provinces successfully",
                HttpStatus.OK,
                request
        );
    }
}
