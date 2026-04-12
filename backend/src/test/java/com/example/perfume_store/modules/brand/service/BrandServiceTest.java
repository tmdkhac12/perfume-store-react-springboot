package com.example.perfume_store.modules.brand.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.brand.Brand;
import com.example.perfume_store.domain.brand.BrandRepository;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import com.example.perfume_store.modules.brand.dto.request.BrandRequestDTO;
import com.example.perfume_store.modules.brand.dto.response.BrandResponseDTO;
import com.example.perfume_store.modules.brand.mapper.BrandMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

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

    // --- Private Helper Methods (Data Factories) ---

    private Brand createBrand(int id, String name, boolean hide) {
        Brand brand = new Brand();
        brand.setId(id);
        brand.setName(name);
        brand.setHide(hide);
        return brand;
    }

    private BrandRequestDTO createRequestDTO(String name, boolean hide) {
        BrandRequestDTO dto = new BrandRequestDTO();
        dto.setName(name);
        dto.setHide(hide);
        return dto;
    }

    private BrandResponseDTO createResponseDTO(int id, String name, boolean hide) {
        BrandResponseDTO dto = new BrandResponseDTO();
        dto.setId(id);
        dto.setName(name);
        dto.setHide(hide);
        return dto;
    }

    // --- getAllBrands ---

    @Test
    @DisplayName("getAllBrands: Should return list of BrandResponseDTO")
    void getAllBrands_Success() {
        // Arrange
        List<Brand> brands = List.of(createBrand(1, "Chanel", false));
        List<BrandResponseDTO> dtos = List.of(createResponseDTO(1, "Chanel", false));

        when(brandRepository.findAll()).thenReturn(brands);
        when(brandMapper.toResponseDTO(brands)).thenReturn(dtos);

        // Act
        List<BrandResponseDTO> result = brandService.getAllBrands();

        // Assert
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Chanel");
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
        int id = 1;
        Brand brand = createBrand(id, "Chanel", false);
        BrandResponseDTO dto = createResponseDTO(id, "Chanel", false);

        when(brandRepository.findById(id)).thenReturn(Optional.of(brand));
        when(brandMapper.toResponseDTO(brand)).thenReturn(dto);

        BrandResponseDTO result = brandService.getBrandById(id);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Chanel");
    }

    @Test
    @DisplayName("getBrandById: Should throw NotFoundException when ID not found")
    void getBrandById_NotFound() {
        int id = 1;
        when(brandRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> brandService.getBrandById(id))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Brand Not Found");
    }

    // --- createBrand ---

    @Test
    @DisplayName("createBrand: Should return BrandResponseDTO after saving")
    void createBrand_Success() {
        BrandRequestDTO request = createRequestDTO("Chanel", false);
        Brand brand = createBrand(0, "Chanel", false);
        Brand savedBrand = createBrand(1, "Chanel", false);
        BrandResponseDTO response = createResponseDTO(1, "Chanel", false);

        when(brandMapper.toEntity(request)).thenReturn(brand);
        when(brandRepository.save(brand)).thenReturn(savedBrand);
        when(brandMapper.toResponseDTO(savedBrand)).thenReturn(response);

        BrandResponseDTO result = brandService.createBrand(request);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);
        verify(brandRepository).save(brand);
    }

    // --- updateBrand ---

    @Test
    @DisplayName("updateBrand: Should update and return BrandResponseDTO when ID exists")
    void updateBrand_Success() {
        int id = 1;
        BrandRequestDTO request = createRequestDTO("New Name", true);
        Brand existingBrand = createBrand(id, "Old Name", false);
        BrandResponseDTO response = createResponseDTO(id, "New Name", true);

        when(brandRepository.findById(id)).thenReturn(Optional.of(existingBrand));
        when(brandRepository.save(existingBrand)).thenReturn(existingBrand);
        when(brandMapper.toResponseDTO(existingBrand)).thenReturn(response);

        BrandResponseDTO result = brandService.updateBrand(id, request);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("New Name");
        verify(brandMapper).updateEntity(existingBrand, request);
        verify(brandRepository).save(existingBrand);
    }

    // --- deleteBrand ---

    @Test
    @DisplayName("deleteBrand: Should throw NotFoundException when brand not found")
    void deleteBrand_NotFound() {
        int id = 1;
        when(brandRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> brandService.deleteBrand(id))
                .isInstanceOf(NotFoundException.class);

        verify(perfumeRepository, never()).existsByBrand(any());
        verify(brandRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteBrand: Should throw IllegalStateException when perfumes exist")
    void deleteBrand_HasPerfumes() {
        int id = 1;
        Brand brand = createBrand(id, "Chanel", false);

        when(brandRepository.findById(id)).thenReturn(Optional.of(brand));
        when(perfumeRepository.existsByBrand(brand)).thenReturn(true);

        assertThatThrownBy(() -> brandService.deleteBrand(id))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Cannot delete brand: There are perfumes associated with this brand.");

        verify(brandRepository, never()).delete(brand);
    }

    @Test
    @DisplayName("deleteBrand: Should delete successfully when no perfumes exist")
    void deleteBrand_Success() {
        int id = 1;
        Brand brand = createBrand(id, "Chanel", false);

        when(brandRepository.findById(id)).thenReturn(Optional.of(brand));
        when(perfumeRepository.existsByBrand(brand)).thenReturn(false);

        brandService.deleteBrand(id);

        verify(brandRepository).delete(brand);
    }
}