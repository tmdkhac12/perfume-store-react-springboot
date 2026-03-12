package com.example.perfume_store.modules.perfume.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class VolumePerfumeResponseDTO {
    private BigDecimal price;
    private double volume;
}
