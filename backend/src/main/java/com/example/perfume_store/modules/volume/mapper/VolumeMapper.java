package com.example.perfume_store.modules.volume.mapper;

import com.example.perfume_store.modules.volume.dtos.request.VolumeRequestDTO;
import com.example.perfume_store.modules.volume.dtos.response.VolumeResponseDTO;
import com.example.perfume_store.modules.volume.entity.Volume;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VolumeMapper {

    VolumeResponseDTO toResponseDTO(Volume entity);

    List<VolumeResponseDTO> toResponseDTO(List<Volume> entities);

    Volume toEntity(VolumeRequestDTO requestDTO);

    void updateEntity(@MappingTarget Volume oldVolume, VolumeRequestDTO requestDTO);
}
