package com.example.perfume_store.modules.volume.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VolumeResponseDTO {
    private int id;
    private double volume;
    private boolean hide;
}
