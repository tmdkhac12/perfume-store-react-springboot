package com.example.perfume_store.domain.address;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findByUserId(int userId);

    List<Address> findByUserIdAndHideFalse(int userId);

    Optional<Address> findByIdAndUserId(int id , int userId);

    Optional<Address> findByIdAndUserIdAndHideFalse(int id, int userId);
}
