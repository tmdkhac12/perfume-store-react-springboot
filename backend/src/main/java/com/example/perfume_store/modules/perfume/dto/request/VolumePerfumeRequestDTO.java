package com.example.perfume_store.modules.perfume.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class VolumePerfumeRequestDTO {

    @NotNull(message = "Volume ID is required")
    @Positive(message = "Invalid Volume ID")
    private Integer volumeId;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Digits(integer = 10, fraction = 2, message = "Price format is invalid (max 2 decimal places)")
    private BigDecimal price;
}