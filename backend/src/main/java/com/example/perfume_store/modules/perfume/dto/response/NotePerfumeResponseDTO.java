package com.example.perfume_store.modules.perfume.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class NotePerfumeResponseDTO {

    private List<String> top, heart, base;
}
