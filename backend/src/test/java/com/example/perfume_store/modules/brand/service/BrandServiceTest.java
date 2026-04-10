package com.example.perfume_store.modules.brand.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.brand.Brand;
import com.example.perfume_store.domain.brand.BrandRepository;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import com.example.perfume_store.modules.brand.dto.request.BrandRequestDTO;
import com.example.perfume_store.modules.brand.dto.response.BrandResponseDTO;
import com.example.perfume_store.modules.brand.mapper.BrandMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class BrandServiceTest {

    @Mock
    private BrandRepository brandRepository;

    @Mock
    private PerfumeRepository perfumeRepository;

    @Mock
    private BrandMapper brandMapper;

    @InjectMocks
    private BrandService brandService;

    private Brand brand;
    private BrandRequestDTO brandRequestDTO;
    private BrandResponseDTO brandResponseDTO;

    @BeforeEach
    void setUp() {
        brand = new Brand();
        brand.setId(1);
        brand.setName("Chanel");

        brandRequestDTO = new BrandRequestDTO();
        brandRequestDTO.setName("Chanel");

        brandResponseDTO = new BrandResponseDTO();
        brandResponseDTO.setId(1);
        brandResponseDTO.setName("Chanel");
    }

    // --- getAllBrands ---

    @Test
    @DisplayName("getAllBrands: Should return list of BrandResponseDTO")
    void getAllBrands_Success() {
        // Arrange
        List<Brand> brands = List.of(brand);
        when(brandRepository.findAll()).thenReturn(brands); // Suppose 
        when(brandMapper.toResponseDTO(brands)).thenReturn(List.of(brandResponseDTO));

        // Act
        List<BrandResponseDTO> result = brandService.getAllBrands();

        // Assert
        assertThat(result).hasSize(1)
                .extracting(BrandResponseDTO::getName)
                .containsExactly("Chanel");
    }

    @Test
    @DisplayName("getAllBrands: Should return empty list when no brands found")
    void getAllBrands_Empty() {
        when(brandRepository.findAll()).thenReturn(Collections.emptyList());
        when(brandMapper.toResponseDTO(anyList())).thenReturn(Collections.emptyList());

        List<BrandResponseDTO> result = brandService.getAllBrands();

        assertThat(result).isEmpty();
    }

    // --- getBrandById ---

    @Test
    @DisplayName("getBrandById: Should return BrandResponseDTO when ID exists")
    void getBrandById_Success() {
        when(brandRepository.findById(1)).thenReturn(Optional.of(brand));
        when(brandMapper.toResponseDTO(brand)).thenReturn(brandResponseDTO);

        BrandResponseDTO result = brandService.getBrandById(1);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Chanel");
    }

    @Test
    @DisplayName("getBrandById: Should throw NotFoundException when ID not found")
    void getBrandById_NotFound() {
        when(brandRepository.findById(1)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> brandService.getBrandById(1))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Brand Not Found");
    }

    // --- createBrand ---

    @Test
    @DisplayName("createBrand: Should return BrandResponseDTO after saving")
    void createBrand_Success() {
        when(brandMapper.toEntity(brandRequestDTO)).thenReturn(brand);
        when(brandRepository.save(brand)).thenReturn(brand);
        when(brandMapper.toResponseDTO(brand)).thenReturn(brandResponseDTO);

        BrandResponseDTO result = brandService.createBrand(brandRequestDTO);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);
        verify(brandRepository).save(any(Brand.class));
    }

    // --- updateBrand ---

    @Test
    @DisplayName("updateBrand: Should update and return BrandResponseDTO when ID exists")
    void updateBrand_Success() {
        when(brandRepository.findById(1)).thenReturn(Optional.of(brand));
        when(brandRepository.save(brand)).thenReturn(brand);
        when(brandMapper.toResponseDTO(brand)).thenReturn(brandResponseDTO);

        BrandResponseDTO result = brandService.updateBrand(1, brandRequestDTO);

        assertThat(result).isNotNull();
        verify(brandMapper).updateEntity(brand, brandRequestDTO);
        verify(brandRepository).save(brand);
    }

    @Test
    @DisplayName("updateBrand: Should throw NotFoundException when updating non-existent ID")
    void updateBrand_NotFound() {
        when(brandRepository.findById(1)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> brandService.updateBrand(1, brandRequestDTO))
                .isInstanceOf(NotFoundException.class);

        verify(brandRepository, never()).save(any());
    }

    // --- deleteBrand ---

    @Test
    @DisplayName("deleteBrand: Should throw NotFoundException when brand not found")
    void deleteBrand_NotFound() {
        // Arrange
        int brandId = 1;
        when(brandRepository.findById(brandId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> brandService.deleteBrand(brandId))
                .isInstanceOf(NotFoundException.class);

        // Verify: never call functions after
        verify(perfumeRepository, never()).existsByBrand(any());
        verify(brandRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteBrand: Should throw IllegalStateException when perfumes exist")
    void deleteBrand_HasPerfumes() {
        // Arrange
        int brandId = 1;
        Brand brand = new Brand();
        brand.setId(brandId);

        when(brandRepository.findById(brandId)).thenReturn(Optional.of(brand));
        when(perfumeRepository.existsByBrand(brand)).thenReturn(true);

        // Act & Assert
        assertThatThrownBy(() -> brandService.deleteBrand(brandId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Cannot delete brand: There are perfumes associated with this brand.");

        // Verify
        verify(brandRepository).findById(brandId);
        verify(perfumeRepository).existsByBrand(brand);
        verify(brandRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteBrand: Should delete successfully when no perfumes exist")
    void deleteBrand_Success() {
        // Arrange
        int brandId = 1;
        Brand brand = new Brand();
        brand.setId(brandId);

        when(brandRepository.findById(brandId)).thenReturn(Optional.of(brand));
        // Assume: doesn't exist a perfume with exactly brand id
        when(perfumeRepository.existsByBrand(brand)).thenReturn(false);

        // Act
        brandService.deleteBrand(brandId);

        // Assert & Verify
        verify(brandRepository).findById(brandId);
        verify(perfumeRepository).existsByBrand(brand);
        verify(brandRepository).delete(brand);
    }
}