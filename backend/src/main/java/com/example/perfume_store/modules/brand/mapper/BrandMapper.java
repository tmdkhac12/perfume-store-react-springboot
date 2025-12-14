package com.example.perfume_store.modules.brand.mapper;

import com.example.perfume_store.modules.brand.dto.request.BrandRequestDTO;
import com.example.perfume_store.modules.brand.dto.response.BrandResponseDTO;
import com.example.perfume_store.modules.brand.entity.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    BrandResponseDTO toResponseDTO(Brand entity);

    List<BrandResponseDTO> toResponseDTO(List<Brand> entities);

    Brand toEntity(BrandRequestDTO dto);

    void updateEntity(@MappingTarget Brand entity, BrandRequestDTO dto);
}
