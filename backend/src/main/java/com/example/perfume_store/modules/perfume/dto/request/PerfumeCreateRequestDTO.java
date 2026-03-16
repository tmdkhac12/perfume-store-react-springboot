package com.example.perfume_store.modules.perfume.dto.request;

import com.example.perfume_store.domain.perfume.Concentration;
import com.example.perfume_store.domain.perfume.Gender;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
public class PerfumeCreateRequestDTO {

    @NotBlank(message = "Perfume name is required")
    @Size(min = 2, max = 255, message = "Perfume name must be between 2 and 255 characters")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Gender is required (Male, Female, Unisex)")
    private Gender gender;

    @NotNull(message = "Concentration is required")
    private Concentration concentration;

    @NotNull(message = "Brand ID is required")
    @Positive(message = "Brand ID must be a positive number")
    private Integer brandId;

    @NotEmpty(message = "At least one volume and price must be provided")
    @Valid // Trigger validation for nested objects
    private List<VolumePerfumeRequestDTO> volumes;

    @NotEmpty(message = "At least one perfume note is required")
    @Valid // Trigger validation for nested objects
    private List<NotePerfumeRequestDTO> notes;

    @NotEmpty(message = "Please provide at least one sample image")
    private List<MultipartFile> sampleImages;

    private boolean hide;
}