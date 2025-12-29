package com.example.perfume_store.modules.volume.repository;

import com.example.perfume_store.modules.volume.entity.Volume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolumeRepository extends JpaRepository<Volume, Integer> {
}
