package com.example.perfume_store.modules.volume.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.perfume_store.domain.volume.Volume;
import com.example.perfume_store.modules.volume.dtos.request.VolumeRequestDTO;
import com.example.perfume_store.modules.volume.dtos.response.VolumeResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

public class VolumeMapperTest {

    private VolumeMapper volumeMapper;

    @BeforeEach
    void setUp() {
        volumeMapper = new VolumeMapperImpl();
    }

    @Test
    @DisplayName("toResponseDTO: Should map Volume Entity to VolumeResponseDTO")
    void toResponseDTO_EntityToDTO_Success() {
        // Arrange
        Volume entity = new Volume();
        entity.setId(10);
        entity.setVolume(100.0);
        entity.setHide(false);

        // Act
        VolumeResponseDTO result = volumeMapper.toResponseDTO(entity);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(10);
        assertThat(result.getVolume()).isEqualTo(100.0);
        assertThat(result.isHide()).isFalse();
    }

    @Test
    @DisplayName("toResponseDTO: Should map list of Entities to list of DTOs")
    void toResponseDTO_ListEntitiesToListDTOs_Success() {
        // Arrange
        Volume v1 = new Volume();
        v1.setVolume(30.0);
        Volume v2 = new Volume();
        v2.setVolume(50.0);
        List<Volume> entities = List.of(v1, v2);

        // Act
        List<VolumeResponseDTO> result = volumeMapper.toResponseDTO(entities);

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result).extracting(VolumeResponseDTO::getVolume)
                .containsExactlyInAnyOrder(30.0, 50.0);
    }

    @Test
    @DisplayName("toEntity: Should map VolumeRequestDTO to Volume Entity")
    void toEntity_RequestDTOToEntity_Success() {
        // Arrange
        VolumeRequestDTO dto = new VolumeRequestDTO();
        dto.setVolume(150.5);
        dto.setHide(true);

        // Act
        Volume result = volumeMapper.toEntity(dto);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getVolume()).isEqualTo(150.5);
        assertThat(result.isHide()).isTrue();
        assertThat(result.getId()).isZero();
    }

    @Test
    @DisplayName("updateEntity: Should update existing Entity from RequestDTO")
    void updateEntity_Success() {
        // Arrange
        Volume existingVolume = new Volume();
        existingVolume.setId(5);
        existingVolume.setVolume(10.0);
        existingVolume.setHide(false);

        VolumeRequestDTO updateDTO = new VolumeRequestDTO();
        updateDTO.setVolume(200.0);
        updateDTO.setHide(true);

        // Act
        volumeMapper.updateEntity(existingVolume, updateDTO);

        // Assert
        assertThat(existingVolume.getId()).isEqualTo(5);
        assertThat(existingVolume.getVolume()).isEqualTo(200.0);
        assertThat(existingVolume.isHide()).isTrue();
    }

    @Test
    @DisplayName("toResponseDTO: Should return null when input is null")
    void toResponseDTO_NullInput_ReturnsNull() {
        assertThat(volumeMapper.toResponseDTO((Volume) null)).isNull();
    }
}