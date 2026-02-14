package com.example.perfume_store.domain.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name, email, username, hashedPassword;

    @Column(name = "is_superuser")
    private boolean superuser;

    @Column(name = "is_active")
    private boolean active;
}
