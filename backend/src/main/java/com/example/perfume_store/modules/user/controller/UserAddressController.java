package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import com.example.perfume_store.modules.user.service.UserAddressService;
import com.example.perfume_store.configs.security.SecurityContextGetter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users/me/addresses")
public class UserAddressController {

    private final UserAddressService userAddressService;
    private final SecurityContextGetter securityContextGetter;

    @GetMapping
    public ResponseEntity<?> getAllAddresses(HttpServletRequest request) {
        int userId = securityContextGetter.getUserId();

        var addresses = userAddressService.getAllUserAddresses(userId);
        return ApiResponseFactory.success(addresses, "Get all user's addresses successfully", HttpStatus.OK, request);
    }

    @PostMapping
    public ResponseEntity<?> createAddress(
            @Valid @RequestBody UserAddressCreateRequestDTO userAddressCreateRequestDTO,
            HttpServletRequest request
    ) {
        int userId = securityContextGetter.getUserId();

        var address = userAddressService.createUserAddress(userId, userAddressCreateRequestDTO);
        return ApiResponseFactory.success(address, "User's address created", HttpStatus.CREATED, request);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(
            @PathVariable int addressId,
            @Valid @RequestBody UserAddressUpdateRequestDTO userAddressUpdateRequestDTO,
            HttpServletRequest request
    ) {
        int userId = securityContextGetter.getUserId();

        var updatedAddress = userAddressService.updateUserAddress(userId, addressId, userAddressUpdateRequestDTO);
        return ApiResponseFactory.success(updatedAddress, "User's address updated", HttpStatus.OK, request);
    }

    @PatchMapping("/{addressId}")
    public ResponseEntity<?> softDeleteAddress(
            @PathVariable int addressId,
            HttpServletRequest request
    ) {
        int userId = securityContextGetter.getUserId();

        userAddressService.softDelete(userId, addressId);
        return ApiResponseFactory.success(null, "User's address deleted", HttpStatus.OK, request);
    }
}
