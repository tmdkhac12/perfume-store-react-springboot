package com.example.perfume_store.modules.note.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.note.Note;
import com.example.perfume_store.domain.note.NoteRepository;
import com.example.perfume_store.domain.note_perfume.NotePerfumeRepository;
import com.example.perfume_store.modules.note.dto.request.NoteRequestDTO;
import com.example.perfume_store.modules.note.dto.response.NoteResponseDTO;
import com.example.perfume_store.modules.note.mapper.NoteMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @Mock
    private NoteRepository noteRepository;

    @Mock
    private NotePerfumeRepository notePerfumeRepository;

    @Mock
    private NoteMapper noteMapper;

    @InjectMocks
    private NoteService noteService;

    // --- Private Helper Methods (Data Factories) ---

    private Note createNote(int id, String name, boolean hide) {
        Note note = new Note();
        note.setId(id);
        note.setName(name);
        note.setHide(hide);
        return note;
    }

    private NoteResponseDTO createResponseDTO(int id, String name, boolean hide) {
        NoteResponseDTO dto = new NoteResponseDTO();
        dto.setId(id);
        dto.setName(name);
        dto.setHide(hide);
        return dto;
    }

    private NoteRequestDTO createRequestDTO(String name, boolean hide) {
        NoteRequestDTO dto = new NoteRequestDTO();
        dto.setName(name);
        dto.setHide(hide);
        return dto;
    }

    // --- Test Cases for getAllNotes ---

    @Test
    @DisplayName("getAllNotes: Should return list of NoteResponseDTO")
    void getAllNotes_Success() {
        // Arrange
        List<Note> notes = List.of(createNote(1, "Floral", false));
        List<NoteResponseDTO> dtos = List.of(createResponseDTO(1, "Floral", false));

        when(noteRepository.findAll()).thenReturn(notes);
        when(noteMapper.toResponseDTO(notes)).thenReturn(dtos);

        // Act
        List<NoteResponseDTO> result = noteService.getAllNotes();

        // Assert
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getName()).isEqualTo("Floral");
        verify(noteRepository).findAll();
    }

    // --- Test Cases for getNoteById ---

    @Test
    @DisplayName("getNoteById: Should return DTO when found")
    void getNoteById_Found_Success() {
        // Arrange
        int id = 1;
        Note note = createNote(id, "Woody", false);
        NoteResponseDTO dto = createResponseDTO(id, "Woody", false);

        when(noteRepository.findById(id)).thenReturn(Optional.of(note));
        when(noteMapper.toResponseDTO(note)).thenReturn(dto);

        // Act
        NoteResponseDTO result = noteService.getNoteById(id);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Woody");
        verify(noteRepository).findById(id);
    }

    @Test
    @DisplayName("getNoteById: Should throw NotFoundException when not found")
    void getNoteById_NotFound_ThrowsException() {
        // Arrange
        int id = 1;
        when(noteRepository.findById(id)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> noteService.getNoteById(id))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Note not found");
    }

    // --- Test Cases for createNote ---

    @Test
    @DisplayName("createNote: Should save and return DTO")
    void createNote_Success() {
        // Arrange
        NoteRequestDTO request = createRequestDTO("Citrus", false);
        Note note = createNote(0, "Citrus", false);
        Note savedNote = createNote(1, "Citrus", false);
        NoteResponseDTO response = createResponseDTO(1, "Citrus", false);

        when(noteMapper.toEntity(request)).thenReturn(note);
        when(noteRepository.save(note)).thenReturn(savedNote);
        when(noteMapper.toResponseDTO(savedNote)).thenReturn(response);

        // Act
        NoteResponseDTO result = noteService.createNote(request);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);
        verify(noteRepository).save(note);
    }

    // --- Test Cases for updateNote ---

    @Test
    @DisplayName("updateNote: Should update and return DTO when ID exists")
    void updateNote_Success() {
        // Arrange
        int id = 1;
        NoteRequestDTO request = createRequestDTO("New Name", true);
        Note existingNote = createNote(id, "Old Name", false);
        NoteResponseDTO response = createResponseDTO(id, "New Name", true);

        when(noteRepository.findById(id)).thenReturn(Optional.of(existingNote));
        when(noteRepository.save(existingNote)).thenReturn(existingNote);
        when(noteMapper.toResponseDTO(existingNote)).thenReturn(response);

        // Act
        NoteResponseDTO result = noteService.updateNote(id, request);

        // Assert
        assertThat(result.getName()).isEqualTo("New Name");
        verify(noteMapper).updateEntity(existingNote, request);
        verify(noteRepository).save(existingNote);
    }

    // --- Test Cases for deleteNote ---

    @Test
    @DisplayName("deleteNote: Should delete successfully when no associations exist")
    void deleteNote_Success() {
        // Arrange
        int id = 1;
        Note note = createNote(id, "Spicy", false);

        when(noteRepository.findById(id)).thenReturn(Optional.of(note));
        when(notePerfumeRepository.existsByNote(note)).thenReturn(false);

        // Act
        noteService.deleteNote(id);

        // Assert
        verify(noteRepository).delete(note);
    }

    @Test
    @DisplayName("deleteNote: Should throw IllegalStateException when perfumes use this note")
    void deleteNote_HasPerfumes_ThrowsException() {
        // Arrange
        int id = 1;
        Note note = createNote(id, "Floral", false);

        when(noteRepository.findById(id)).thenReturn(Optional.of(note));
        when(notePerfumeRepository.existsByNote(note)).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> noteService.deleteNote(id))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Cannot delete note: There are perfumes using this note.");

        verify(noteRepository, never()).delete(any());
    }
}