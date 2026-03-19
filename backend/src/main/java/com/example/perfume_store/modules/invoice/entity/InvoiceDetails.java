package com.example.perfume_store.modules.invoice.entity;

import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class InvoiceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    private VolumePerfume volumePerfume;

    @ManyToOne
    @ToString.Exclude
    private Invoice invoice;

    private int quantity;

    private BigDecimal buyPrice;

    private String perfumeName;

    private double volumeName;
}
