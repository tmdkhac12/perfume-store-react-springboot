package com.example.perfume_store.modules.brand.repository;

import com.example.perfume_store.modules.brand.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
}
