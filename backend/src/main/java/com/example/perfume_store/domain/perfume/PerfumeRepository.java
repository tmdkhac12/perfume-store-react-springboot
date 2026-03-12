package com.example.perfume_store.domain.perfume;

import org.jspecify.annotations.NullMarked;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfumeRepository extends JpaRepository<Perfume, Integer> {

    @EntityGraph(attributePaths = {
            "brand",
    })
    @NullMarked
    Page<Perfume> findAll(Pageable pageable);
}
