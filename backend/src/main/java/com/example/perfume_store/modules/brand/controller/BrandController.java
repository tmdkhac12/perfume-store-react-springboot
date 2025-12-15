package com.example.perfume_store.modules.brand.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.brand.dto.request.BrandRequestDTO;
import com.example.perfume_store.modules.brand.service.BrandService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/brands")
@AllArgsConstructor
public class BrandController {

    private final BrandService service;

    @GetMapping("")
    public ResponseEntity<?> getAllBrands(HttpServletRequest request) {
        var brands = service.getAllBrands();
        return ApiResponseFactory.success(brands, "Get all brands successfully", HttpStatus.OK, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBrand(@PathVariable int id, HttpServletRequest request) {
        var brand = service.getBrandById(id);
        return ApiResponseFactory.success(brand, "Brand retrieved", HttpStatus.OK, request);
    }

    @PostMapping("")
    public ResponseEntity<?> createBrand(@Valid @RequestBody BrandRequestDTO requestBody, HttpServletRequest request) {
        var brandCreated = service.createBrand(requestBody);
        return ApiResponseFactory.success(brandCreated, "Brand Created", HttpStatus.CREATED, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable int id, @Valid @RequestBody BrandRequestDTO requestBody, HttpServletRequest request) {
        var updatedBrand = service.updateBrand(id, requestBody);
        return ApiResponseFactory.success(updatedBrand, "Brand Updated", HttpStatus.OK, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> hardDeleteBrand(@PathVariable int id, HttpServletRequest request) {
        service.deleteBrand(id);
        return ApiResponseFactory.success(null, "Brand Deleted", HttpStatus.OK, request);
    }
}
