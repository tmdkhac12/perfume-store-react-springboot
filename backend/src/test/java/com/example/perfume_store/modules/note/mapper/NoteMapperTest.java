package com.example.perfume_store.modules.note.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.perfume_store.domain.note.Note;
import com.example.perfume_store.modules.note.dto.request.NoteRequestDTO;
import com.example.perfume_store.modules.note.dto.response.NoteResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

class NoteMapperTest {

    private NoteMapper noteMapper;

    @BeforeEach
    void setUp() {
        noteMapper = new NoteMapperImpl();
    }

    // --- Private Helper Methods ---

    private Note createNote(int id, String name, boolean hide) {
        Note note = new Note();
        note.setId(id);
        note.setName(name);
        note.setHide(hide);
        return note;
    }

    private NoteRequestDTO createRequestDTO(String name, boolean hide) {
        NoteRequestDTO dto = new NoteRequestDTO();
        dto.setName(name);
        dto.setHide(hide);
        return dto;
    }

    // --- Test Cases ---

    @Test
    @DisplayName("toResponseDTO: Should map Entity to ResponseDTO correctly")
    void toResponseDTO_EntityToDTO_Success() {
        // Arrange
        Note entity = createNote(1, "Floral", false);

        // Act
        NoteResponseDTO result = noteMapper.toResponseDTO(entity);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);
        assertThat(result.getName()).isEqualTo("Floral");
        assertThat(result.isHide()).isFalse();
    }

    @Test
    @DisplayName("toResponseDTO: Should map list of Entities to list of DTOs")
    void toResponseDTO_ListEntities_Success() {
        // Arrange
        List<Note> entities = List.of(
                createNote(1, "Woody", false),
                createNote(2, "Citrus", true)
        );

        // Act
        List<NoteResponseDTO> result = noteMapper.toResponseDTO(entities);

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Woody");
        assertThat(result.get(1).isHide()).isTrue();
    }

    @Test
    @DisplayName("toEntity: Should map RequestDTO to Entity correctly")
    void toEntity_RequestDTOToEntity_Success() {
        // Arrange
        NoteRequestDTO dto = createRequestDTO("Oriental", true);

        // Act
        Note result = noteMapper.toEntity(dto);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Oriental");
        assertThat(result.isHide()).isTrue();
        assertThat(result.getId()).isZero();
    }

    @Test
    @DisplayName("updateEntity: Should update existing Entity fields without changing ID")
    void updateEntity_Success() {
        // Arrange
        Note existingNote = createNote(10, "Old Name", false);
        NoteRequestDTO updateDTO = createRequestDTO("New Name", true);

        // Act
        noteMapper.updateEntity(existingNote, updateDTO);

        // Assert
        assertThat(existingNote.getId()).isEqualTo(10);
        assertThat(existingNote.getName()).isEqualTo("New Name");
        assertThat(existingNote.isHide()).isTrue();
    }

    @Test
    @DisplayName("toResponseDTO: Should return null when input is null")
    void toResponseDTO_NullInput_ReturnsNull() {
        assertThat(noteMapper.toResponseDTO((Note) null)).isNull();
    }
}