package com.example.perfume_store.domain.perfume;

import com.example.perfume_store.domain.brand.Brand;
import com.example.perfume_store.domain.note_perfume.NotePerfume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import com.example.perfume_store.modules.perfume.entity.SampleImage;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Concentration concentration;

    private String name, description;

    @ManyToOne
    private Brand brand;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "perfume", cascade = CascadeType.ALL)
    private List<SampleImage> sampleImages;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "perfume", cascade = CascadeType.ALL)
    private List<VolumePerfume> volumePerfumes;

    @BatchSize(size = 20)
    @OneToMany(mappedBy = "perfume", cascade = CascadeType.ALL)
    private List<NotePerfume> notePerfumes;

    private boolean hide;
}
