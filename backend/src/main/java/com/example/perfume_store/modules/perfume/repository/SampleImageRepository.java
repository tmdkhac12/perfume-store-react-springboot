package com.example.perfume_store.modules.perfume.repository;

import com.example.perfume_store.modules.perfume.entity.SampleImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SampleImageRepository extends JpaRepository<SampleImage, Integer> {

    Optional<List<SampleImage>> findAllByPerfumeId(int id);
}
