package com.example.perfume_store.modules.volume.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Volume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double volume;
    private boolean hide;

}
