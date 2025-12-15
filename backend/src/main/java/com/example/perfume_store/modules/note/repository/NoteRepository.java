package com.example.perfume_store.modules.note.repository;

import com.example.perfume_store.modules.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Integer> {
}
