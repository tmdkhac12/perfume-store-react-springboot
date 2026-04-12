package com.example.perfume_store.domain.note_perfume;

import com.example.perfume_store.domain.note.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NotePerfumeRepository extends JpaRepository<NotePerfume, Integer> {

    @Modifying
    @Query("delete from NotePerfume n where n.perfume.id = :id")
    void deleteAllByPerfumeId(int id);

    boolean existsByNote(Note note);
}
