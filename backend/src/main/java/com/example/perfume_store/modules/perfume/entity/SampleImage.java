package com.example.perfume_store.modules.perfume.entity;

import com.example.perfume_store.domain.perfume.Perfume;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class SampleImage {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @ToString.Exclude
    private Perfume perfume;

    private String path;
}
