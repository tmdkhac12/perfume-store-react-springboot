package com.example.perfume_store.modules.perfume.dto.response;

import com.example.perfume_store.domain.perfume.Concentration;
import com.example.perfume_store.domain.perfume.Gender;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PerfumeDetailsResponseDTO {
    private int id;

    private Gender gender;

    private Concentration concentration;

    private String name, description;

    private String brand;

    private List<String> sampleImages;

    private List<VolumePerfumeResponseDTO> volumes;

    private NotePerfumeResponseDTO notes;
}
