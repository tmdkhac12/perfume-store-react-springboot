package com.example.perfume_store.modules.note.mapper;

import com.example.perfume_store.modules.note.dto.request.NoteRequestDTO;
import com.example.perfume_store.modules.note.dto.response.NoteResponseDTO;
import com.example.perfume_store.modules.note.entity.Note;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoteMapper {
    NoteResponseDTO toResponseDTO(Note entity);

    List<NoteResponseDTO> toResponseDTO(List<Note> entities);

    Note toEntity(NoteRequestDTO requestDTO);

    void updateEntity(@MappingTarget Note oldNote, NoteRequestDTO newNote);
}
