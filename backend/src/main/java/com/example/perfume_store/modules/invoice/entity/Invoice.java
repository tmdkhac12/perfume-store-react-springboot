package com.example.perfume_store.modules.invoice.entity;

import com.example.perfume_store.domain.user.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Relations
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
