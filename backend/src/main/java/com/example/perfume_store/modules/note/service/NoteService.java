package com.example.perfume_store.modules.note.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.modules.note.dto.request.NoteRequestDTO;
import com.example.perfume_store.modules.note.dto.response.NoteResponseDTO;
import com.example.perfume_store.modules.note.entity.Note;
import com.example.perfume_store.modules.note.mapper.NoteMapper;
import com.example.perfume_store.modules.note.repository.NoteRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;

    public List<NoteResponseDTO> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        return noteMapper.toResponseDTO(notes);
    }

    private Note getNoteByIdEntity(int id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Note not found"));
    }

    public NoteResponseDTO getNoteById(int id) {
        Note note = getNoteByIdEntity(id);
        return noteMapper.toResponseDTO(note);
    }

    @Transactional
    public NoteResponseDTO createNote(NoteRequestDTO requestDTO) {
        Note note = noteMapper.toEntity(requestDTO);
        Note createdNote = noteRepository.save(note);
        return  noteMapper.toResponseDTO(createdNote);
    }

    @Transactional
    public NoteResponseDTO updateNote(int id, NoteRequestDTO requestDTO) {
        Note oldNote = getNoteByIdEntity(id);
        noteMapper.updateEntity(oldNote, requestDTO);
        Note updatedNote = noteRepository.save(oldNote);
        return noteMapper.toResponseDTO(updatedNote);
    }

    @Transactional
    public void deleteNote(int id) {
        Note note = getNoteByIdEntity(id);
        noteRepository.delete(note);
    }
}
