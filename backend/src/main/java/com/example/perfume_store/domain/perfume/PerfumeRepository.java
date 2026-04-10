package com.example.perfume_store.domain.perfume;

import com.example.perfume_store.domain.brand.Brand;
import org.jspecify.annotations.NullMarked;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PerfumeRepository extends JpaRepository<Perfume, Integer>, JpaSpecificationExecutor<Perfume> {

    @EntityGraph(attributePaths = {
            "brand",
    })
    @NullMarked
    Page<Perfume> findAll(@Nullable Specification specification, Pageable pageable);

    boolean existsByBrand(Brand brand);
}
