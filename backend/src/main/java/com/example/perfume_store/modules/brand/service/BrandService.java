package com.example.perfume_store.modules.brand.service;

import com.example.perfume_store.modules.brand.dto.request.BrandRequestDTO;
import com.example.perfume_store.modules.brand.dto.response.BrandResponseDTO;
import com.example.perfume_store.modules.brand.entity.Brand;
import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.modules.brand.mapper.BrandMapper;
import com.example.perfume_store.modules.brand.repository.BrandRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;

    public List<BrandResponseDTO> getAllBrands() {
        return brandMapper.toResponseDTO(brandRepository.findAll());
    }

    public BrandResponseDTO getBrandById(int id) {
        Brand brand = getBrandEntity(id);
        return brandMapper.toResponseDTO(brand);
    }

    private Brand getBrandEntity(int id) {
       return brandRepository.findById(id)
               .orElseThrow(() -> new NotFoundException("Brand Not Found"));
    }

    @Transactional
    public BrandResponseDTO createBrand(BrandRequestDTO request) {
        Brand brand = brandMapper.toEntity(request);
        return brandMapper.toResponseDTO(brandRepository.save(brand));
    }

    @Transactional
    public BrandResponseDTO updateBrand(int id, BrandRequestDTO request) {
        Brand oldBrand = getBrandEntity(id);
        brandMapper.updateEntity(oldBrand, request);
        return brandMapper.toResponseDTO(brandRepository.save(oldBrand));
    }

    @Transactional
    public void deleteBrand(int id) {
        Brand oldBrand = getBrandEntity(id);
        brandRepository.delete(oldBrand);
    }
}
