package com.example.perfume_store.modules.perfume.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.note_perfume.NotePerfume;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import com.example.perfume_store.modules.perfume.dto.request.PerfumeCreateRequestDTO;
import com.example.perfume_store.modules.perfume.dto.request.PerfumeUpdateRequestDTO;
import com.example.perfume_store.modules.perfume.dto.response.NotePerfumeResponseDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumeDetailsResponseDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumePublicResponseDTO;
import com.example.perfume_store.modules.perfume.dto.response.VolumePerfumeResponseDTO;
import com.example.perfume_store.modules.perfume.entity.SampleImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PerfumeMapper {

    // Perfume Details
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "volumePerfumes", target = "volumes")
    @Mapping(source = "notePerfumes", target = "notes")
    PerfumeDetailsResponseDTO toDetailsResponseDTO(Perfume entity);

    // SampleImage -> String
    default String map(SampleImage sampleImage) {
        return sampleImage.getPath();
    }

    @Named("firstImage")
    default String mapToFirstImage(List<SampleImage> images) {
        return images.getFirst().getPath();
    }

    // VolumePerfume -> VolumePerfumeResponseDTO
    @Mapping(source = "volume.volume", target = "volume")
    VolumePerfumeResponseDTO toVolumeDTO(VolumePerfume entity);

    // List<NotePerfume> -> NotePerfumeResponseDTO (contain 3 List inside)
    default NotePerfumeResponseDTO mapNotes(List<NotePerfume> notes) {
        if (notes == null) return null;
        NotePerfumeResponseDTO dto = new NotePerfumeResponseDTO();
        dto.setTop(new ArrayList<>());
        dto.setHeart(new ArrayList<>());
        dto.setBase(new ArrayList<>());

        for (NotePerfume n : notes) {
            String name = n.getNote().getName();
            switch (n.getType()) {
                case Top -> dto.getTop().add(name);
                case Heart -> dto.getHeart().add(name);
                case Base -> dto.getBase().add(name);
            }
        }
        return dto;
    }

    // Perfume Public
    @Mapping(source = "brand.name", target = "brand")
    @Mapping(source = "sampleImages", target = "sampleImage", qualifiedByName = "firstImage")
    @Mapping(source = "volumePerfumes", target = "minPrice", qualifiedByName = "minPriceMapping")
    PerfumePublicResponseDTO toPublicResponseDTO(Perfume perfume);

    @Mapping(target = "page", expression = "java(perfumes.getNumber() + 1)")
    PageResponse<PerfumePublicResponseDTO> toPublicPageResponse(Page<Perfume> perfumes);

    @Named("minPriceMapping")
    default BigDecimal getMinPrice(List<VolumePerfume> volumePerfumes) {
        return volumePerfumes
                .stream()
                .map(VolumePerfume::getPrice)
                .min(BigDecimal::compareTo)
                .orElse(null);
    }

    // Perfume Request to Entity
    @Mapping(target = "sampleImages", ignore = true)
    Perfume toEntity(PerfumeCreateRequestDTO perfumeCreateRequestDTO);

    void updateEntity(@MappingTarget Perfume perfume, PerfumeUpdateRequestDTO perfumeUpdateRequestDTO);
}