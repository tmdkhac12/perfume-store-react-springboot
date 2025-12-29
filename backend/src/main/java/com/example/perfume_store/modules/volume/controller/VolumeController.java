package com.example.perfume_store.modules.volume.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.volume.dtos.request.VolumeRequestDTO;
import com.example.perfume_store.modules.volume.service.VolumeService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/volumes")
@AllArgsConstructor
public class VolumeController {

    private final VolumeService volumeService;

    @GetMapping
    public ResponseEntity<?> getALlVolumes(HttpServletRequest request) {
        var volumes = volumeService.getAllVolumes();
        return ApiResponseFactory.success(volumes, "Get all volumes successfully", HttpStatus.OK, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVolumeById(@PathVariable int id, HttpServletRequest request) {
        var volume = volumeService.getVolumeById(id);
        return ApiResponseFactory.success(volume, "Volume retrieved", HttpStatus.OK, request);
    }

    @PostMapping
    public ResponseEntity<?> createVolume(@RequestBody @Valid VolumeRequestDTO requestDTO, HttpServletRequest request) {
        var volume = volumeService.createVolume(requestDTO);
        return ApiResponseFactory.success(volume, "Volume retrieved", HttpStatus.CREATED, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVolume(@PathVariable int id, @RequestBody @Valid VolumeRequestDTO requestDTO, HttpServletRequest request) {
        var updatedVolume = volumeService.updateVolume(id, requestDTO);
        return ApiResponseFactory.success(updatedVolume, "Volume Updated", HttpStatus.OK, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVolume(@PathVariable int id, HttpServletRequest request) {
        volumeService.deleteVolume(id);
        return ApiResponseFactory.success(null, "Volume Deleted", HttpStatus.OK, request);
    }
}
