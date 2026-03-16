package com.example.perfume_store.domain.note_perfume;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface NotePerfumeRepository extends JpaRepository<NotePerfume, Integer> {

    @Modifying
    @Query("delete from NotePerfume n where n.perfume.id = :id")
    void deleteAllByPerfumeId(int id);
}
