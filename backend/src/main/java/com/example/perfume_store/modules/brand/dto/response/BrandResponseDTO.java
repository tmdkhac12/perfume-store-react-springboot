package com.example.perfume_store.modules.brand.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BrandResponseDTO {

    private int id;
    private String name;
    private boolean hide;
}
