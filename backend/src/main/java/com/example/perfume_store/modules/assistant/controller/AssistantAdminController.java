package com.example.perfume_store.modules.assistant.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.assistant.service.VectorStorageService;
import lombok.AllArgsConstructor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/assistant")
@AllArgsConstructor
public class AssistantAdminController {

    private final VectorStorageService vectorStorageService;

    @PostMapping("/sync")
    public ResponseEntity<?> syncVectorDatabase(HttpServletRequest request) {
        vectorStorageService.loadExistingPerfumesToVectorDb();
        return ApiResponseFactory.success(
                null,
                "Vector database synchronization started successfully.",
                HttpStatus.OK,
                request
        );
    }
}
