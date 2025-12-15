package com.example.perfume_store.modules.note.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteResponseDTO {

    private int id;
    private String name;
    private boolean hide;
}
