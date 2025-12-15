package com.example.perfume_store.modules.note.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NoteRequestDTO {

    @NotBlank(message = "Note name must not be blank")
    @Size(min = 1, max = 255, message = "Note name must between 1 and 255 characters")
    private String name;

    private boolean hide;
}
