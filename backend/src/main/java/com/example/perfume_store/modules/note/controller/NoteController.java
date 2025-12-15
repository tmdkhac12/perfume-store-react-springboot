package com.example.perfume_store.modules.note.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.note.dto.request.NoteRequestDTO;
import com.example.perfume_store.modules.note.service.NoteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notes")
@AllArgsConstructor
public class NoteController {

    private final NoteService service;

    @GetMapping
    public ResponseEntity<?> getAllNotes(HttpServletRequest request) {
        var notes = service.getAllNotes();
        return ApiResponseFactory.success(notes, "Get all notes successfully", HttpStatus.OK, request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable int id, HttpServletRequest request) {
        var note = service.getNoteById(id);
        return ApiResponseFactory.success(note, "Note retrieved", HttpStatus.OK, request);
    }

    @PostMapping
    public ResponseEntity<?> createNote(@Valid @RequestBody NoteRequestDTO requestDTO, HttpServletRequest request) {
        var createdNote = service.createNote(requestDTO);
        return ApiResponseFactory.success(createdNote, "Note created", HttpStatus.CREATED, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(@PathVariable int id, @Valid @RequestBody NoteRequestDTO requestDTO, HttpServletRequest request) {
        var updatedNote = service.updateNote(id, requestDTO);
        return ApiResponseFactory.success(updatedNote, "Note updated", HttpStatus.OK, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable int id, HttpServletRequest request) {
        service.deleteNote(id);
        return ApiResponseFactory.success(null, "Note deleted", HttpStatus.OK, request);
    }
}
