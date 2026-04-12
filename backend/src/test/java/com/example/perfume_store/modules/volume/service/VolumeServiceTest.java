package com.example.perfume_store.modules.volume.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.volume.Volume;
import com.example.perfume_store.domain.volume.VolumeRepository;
import com.example.perfume_store.modules.volume.dtos.request.VolumeRequestDTO;
import com.example.perfume_store.modules.volume.dtos.response.VolumeResponseDTO;
import com.example.perfume_store.modules.volume.mapper.VolumeMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class VolumeServiceTest {

    @Mock
    private VolumeRepository volumeRepository;

    @Mock
    private VolumeMapper volumeMapper;

    @InjectMocks
    private VolumeService volumeService;

    // --- Private Helper Methods (Data Factories) ---

    private Volume createVolume(int id, double value, boolean hide) {
        Volume volume = new Volume();
        volume.setId(id);
        volume.setVolume(value);
        volume.setHide(hide);
        return volume;
    }

    private VolumeResponseDTO createResponseDTO(int id, double value, boolean hide) {
        VolumeResponseDTO dto = new VolumeResponseDTO();
        dto.setId(id);
        dto.setVolume(value);
        dto.setHide(hide);
        return dto;
    }

    private VolumeRequestDTO createRequestDTO(double value, boolean hide) {
        VolumeRequestDTO dto = new VolumeRequestDTO();
        dto.setVolume(value);
        dto.setHide(hide);
        return dto;
    }

    // --- Test Cases ---

    @Test
    @DisplayName("getAllVolumes: Should return a list of VolumeResponseDTO")
    void getAllVolumes_Success() {
        // Arrange
        List<Volume> volumes = List.of(
                createVolume(1, 50.0, false),
                createVolume(2, 100.0, false)
        );
        List<VolumeResponseDTO> dtos = List.of(
                createResponseDTO(1, 50.0, false),
                createResponseDTO(2, 100.0, false)
        );

        when(volumeRepository.findAll()).thenReturn(volumes);
        when(volumeMapper.toResponseDTO(volumes)).thenReturn(dtos);

        // Act
        List<VolumeResponseDTO> result = volumeService.getAllVolumes();

        // Assert
        assertThat(result).hasSize(2);
        assertThat(result.getFirst().getVolume()).isEqualTo(50.0);
        assertThat(result.get(1).getVolume()).isEqualTo(100.0);
        verify(volumeRepository).findAll();
        verify(volumeMapper).toResponseDTO(volumes);
    }

    @Test
    @DisplayName("getVolumeById: Should return DTO when found")
    void getVolumeById_Found_Success() {
        // Arrange
        int id = 1;
        Volume volume = createVolume(id, 100.0, false);
        VolumeResponseDTO dto = createResponseDTO(id, 100.0, false);

        when(volumeRepository.findById(id)).thenReturn(Optional.of(volume));
        when(volumeMapper.toResponseDTO(volume)).thenReturn(dto);

        // Act
        VolumeResponseDTO result = volumeService.getVolumeById(id);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(id);
        assertThat(result.getVolume()).isEqualTo(100.0);
        verify(volumeRepository).findById(id);
    }

    @Test
    @DisplayName("getVolumeById: Should throw NotFoundException when not found")
    void getVolumeById_NotFound_ThrowsException() {
        // Arrange
        int id = 99;
        when(volumeRepository.findById(id)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> volumeService.getVolumeById(id))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Volume not found");

        verify(volumeMapper, never()).toResponseDTO(any(Volume.class));
    }

    @Test
    @DisplayName("createVolume: Should save and return DTO")
    void createVolume_Success() {
        // Arrange
        VolumeRequestDTO request = createRequestDTO(150.0, false);
        Volume volume = createVolume(0, 150.0, false);
        Volume savedVolume = createVolume(1, 150.0, false);
        VolumeResponseDTO response = createResponseDTO(1, 150.0, false);

        when(volumeMapper.toEntity(request)).thenReturn(volume);
        when(volumeRepository.save(volume)).thenReturn(savedVolume);
        when(volumeMapper.toResponseDTO(savedVolume)).thenReturn(response);

        // Act
        VolumeResponseDTO result = volumeService.createVolume(request);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);
        assertThat(result.getVolume()).isEqualTo(150.0);
        assertThat(result.isHide()).isFalse();
        verify(volumeRepository).save(volume);
    }

    @Test
    @DisplayName("updateVolume: Should update existing volume and return DTO")
    void updateVolume_Success() {
        // Arrange
        int id = 1;
        VolumeRequestDTO request = createRequestDTO(200.0, true);
        Volume existingVolume = createVolume(id, 100.0, false);
        VolumeResponseDTO response = createResponseDTO(id, 200.0, true);

        when(volumeRepository.findById(id)).thenReturn(Optional.of(existingVolume));
        // Mapper use void so we can't mock data, we use verify instead
        when(volumeRepository.save(existingVolume)).thenReturn(existingVolume);
        when(volumeMapper.toResponseDTO(existingVolume)).thenReturn(response);

        // Act
        VolumeResponseDTO result = volumeService.updateVolume(id, request);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getVolume()).isEqualTo(200.0);
        assertThat(result.isHide()).isTrue();

        verify(volumeMapper).updateEntity(existingVolume, request);
        verify(volumeRepository).save(existingVolume);
    }

    @Test
    @DisplayName("deleteVolume: Should call delete on repository when found")
    void deleteVolume_Success() {
        // Arrange
        int id = 1;
        Volume existingVolume = createVolume(id, 75.0, false);
        when(volumeRepository.findById(id)).thenReturn(Optional.of(existingVolume));

        // Act
        volumeService.deleteVolume(id);

        // Assert
        verify(volumeRepository).delete(existingVolume);
    }
}