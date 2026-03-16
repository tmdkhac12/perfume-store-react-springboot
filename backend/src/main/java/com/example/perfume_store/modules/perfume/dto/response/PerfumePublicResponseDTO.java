package com.example.perfume_store.modules.perfume.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class PerfumePublicResponseDTO {
    private int id;

    private String name;

    private String brand;

    private String sampleImage;

    private BigDecimal minPrice;
}
