package com.example.perfume_store.modules.perfume.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.perfume.service.PerfumeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/perfumes")
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

            HttpServletRequest request
    ) {
        var paginatedPerfumes = perfumeService.getPaginatedPerfumes(page, limit);
        return ApiResponseFactory.success(paginatedPerfumes, "Perfume retrieved", HttpStatus.OK, request);
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
