package com.example.perfume_store.modules.volume.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.modules.volume.dtos.request.VolumeRequestDTO;
import com.example.perfume_store.modules.volume.dtos.response.VolumeResponseDTO;
import com.example.perfume_store.modules.volume.entity.Volume;
import com.example.perfume_store.modules.volume.mapper.VolumeMapper;
import com.example.perfume_store.modules.volume.repository.VolumeRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VolumeService {

    private final VolumeRepository volumeRepository;
    private final VolumeMapper volumeMapper;

    public List<VolumeResponseDTO> getAllVolumes() {
        return volumeMapper.toResponseDTO(volumeRepository.findAll());
    }

    private Volume getVolumeByIdEntity(int id) {
        return volumeRepository.findById(id).orElseThrow(() -> new NotFoundException("Volume not found"));
    }

    public VolumeResponseDTO getVolumeById(int id) {
        Volume volume = getVolumeByIdEntity(id);
        return volumeMapper.toResponseDTO(volume);
    }

    @Transactional
    public VolumeResponseDTO createVolume(VolumeRequestDTO volumeRequestDTO) {
        Volume volume = volumeMapper.toEntity(volumeRequestDTO);
        Volume createdVolume = volumeRepository.save(volume);
        return volumeMapper.toResponseDTO(createdVolume);
    }

    @Transactional
    public VolumeResponseDTO updateVolume(int id, VolumeRequestDTO volumeRequestDTO) {
        Volume oldVolume = getVolumeByIdEntity(id);
        volumeMapper.updateEntity(oldVolume, volumeRequestDTO);
        Volume updatedVolume = volumeRepository.save(oldVolume);
        return volumeMapper.toResponseDTO(updatedVolume);
    }

    @Transactional
    public void deleteVolume(int id) {
        Volume oldVolume = getVolumeByIdEntity(id);
        volumeRepository.delete(oldVolume);
    }
}
