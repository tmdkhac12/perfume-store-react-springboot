package com.example.perfume_store.modules.brand.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BrandRequestDTO {

    @NotBlank(message = "Brand name must not be blank")
    @Size(min = 1, max = 255, message = "Brand name must be between 1 and 255 characters")
    private String name;

    private boolean hide;
}
