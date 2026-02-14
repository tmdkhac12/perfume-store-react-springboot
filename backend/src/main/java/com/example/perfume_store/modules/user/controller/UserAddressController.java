package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import com.example.perfume_store.modules.user.service.UserAddressService;
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

    @GetMapping
    public ResponseEntity<?> getAllAddresses(HttpServletRequest request) {
        var addresses = userAddressService.getAllUserAddresses(1);
        return ApiResponseFactory.success(addresses, "Get all user1's addresses successfully", HttpStatus.OK, request);
    }

    @PostMapping
    public ResponseEntity<?> createAddress(
            @Valid @RequestBody UserAddressCreateRequestDTO userAddressCreateRequestDTO,
            HttpServletRequest request
    ) {
        var address = userAddressService.createUserAddress(1, userAddressCreateRequestDTO);
        return ApiResponseFactory.success(address, "User1's address created", HttpStatus.CREATED, request);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(
            @PathVariable int addressId,
            @Valid @RequestBody UserAddressUpdateRequestDTO userAddressUpdateRequestDTO,
            HttpServletRequest request
    ) {
        var updatedAddress = userAddressService.updateUserAddress(1, addressId, userAddressUpdateRequestDTO);
        return ApiResponseFactory.success(updatedAddress, "User1's address updated", HttpStatus.OK, request);
    }

    @PatchMapping("/{addressId}")
    public ResponseEntity<?> softDeleteAddress(
            @PathVariable int addressId,
            HttpServletRequest request
    ) {
        userAddressService.softDelete(1, addressId);
        return ApiResponseFactory.success(null, "User1's address deleted", HttpStatus.OK, request);
    }
}
