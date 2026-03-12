package com.example.perfume_store.domain.volume_perfume;

import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.volume.Volume;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class VolumePerfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @ToString.Exclude
    private Perfume perfume;

    @ManyToOne
    private Volume volume;

    private BigDecimal price;
}
