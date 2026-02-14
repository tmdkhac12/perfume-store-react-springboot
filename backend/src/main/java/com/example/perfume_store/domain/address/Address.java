package com.example.perfume_store.domain.address;

import com.example.perfume_store.domain.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private User user;

    private String receiver;

    private String phoneNumber;

    private String cityName;

    private String wardName;

    private String deliveryAddress;

    private boolean hide;
}
