package com.example.perfume_store.domain.volume_perfume;

import com.example.perfume_store.domain.volume.Volume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface VolumePerfumeRepository extends JpaRepository<VolumePerfume, Integer> {

    @Modifying
    @Query("DELETE FROM VolumePerfume v WHERE v.perfume.id = :id")
    void deleteAllByPerfumeId(int id);

    boolean existsByVolume(Volume volume);
}
