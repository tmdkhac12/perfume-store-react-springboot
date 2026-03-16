package com.example.perfume_store.modules.perfume.dto.request;

import com.example.perfume_store.domain.note_perfume.NoteType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotePerfumeRequestDTO {

    @NotNull(message = "Note ID is required")
    @Positive(message = "Invalid Note ID")
    private Integer noteId;

    @NotNull(message = "Note type is required (Top, Heart, Base)")
    private NoteType type;
}