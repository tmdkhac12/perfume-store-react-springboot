package com.example.perfume_store.modules.perfume.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.modules.perfume.service.PerfumeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/perfumes")
@Validated
@AllArgsConstructor
public class PerfumeController {

    private final PerfumeService perfumeService;

    @GetMapping
    public ResponseEntity<?> getPaginatedPerfumes(
            @RequestParam(defaultValue = "1")
            @Min(value = 1, message = "Page number must be greater than 1")
            int page,

            @RequestParam(defaultValue = "8")
            @Min(value = 1, message = "Page limit must be greater than 1")
            @Max(value = 100, message = "Page limit must be smaller than 100")
            int limit,

            @RequestParam(required = false) String name,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) BigDecimal fromPrice,
            @RequestParam(required = false) BigDecimal toPrice,
            @RequestParam(required = false) String orderBy,

            HttpServletRequest request
    ) {
        var paginatedPerfumes = perfumeService.getPaginatedPerfumes(
                page, limit,
                name,
                gender,
                fromPrice, toPrice,
                orderBy
        );
        return ApiResponseFactory.success(paginatedPerfumes, "Get perfumes successfully", HttpStatus.OK, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPerfumeById(
            @PathVariable int id,
            HttpServletRequest request
    ) {
        var perfume = perfumeService.getPerfumeById(id);
        return ApiResponseFactory.success(perfume, "Perfume retrieved", HttpStatus.OK, request);
    }
}
