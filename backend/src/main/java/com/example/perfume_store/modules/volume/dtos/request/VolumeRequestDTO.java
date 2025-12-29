package com.example.perfume_store.modules.volume.dtos.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VolumeRequestDTO {

    @NotNull(message = "Volume cannot be null")
    @DecimalMin(value = "1", message = "Min volume value must be 1")
    private double volume;

    private boolean hide;
}
