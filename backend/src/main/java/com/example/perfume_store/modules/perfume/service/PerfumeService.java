package com.example.perfume_store.modules.perfume.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import com.example.perfume_store.domain.perfume.PerfumeSpecification;
import com.example.perfume_store.modules.perfume.dto.response.PerfumeDetailsResponseDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumePublicResponseDTO;
import com.example.perfume_store.modules.perfume.mapper.PerfumeMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeMapper perfumeMapper;

    private Perfume getPerfumeByIdEntity(int id) {
        return perfumeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Perfume not found"));
    }

    public PageResponse<PerfumePublicResponseDTO> getPaginatedPerfumes(
            int page, int limit,
            String name,
            Gender gender,
            BigDecimal from, BigDecimal to,
            String orderBy
    ) {
        // Handle Sort
        Sort sort = Sort.by("volumePerfumes.price").descending();
        if (orderBy != null && !orderBy.isBlank()) {
            sort = switch (orderBy) {
                case "price_desc" -> Sort.by("volumePerfumes.price").descending();
                case "name_asc" -> Sort.by("name").ascending();
                case "name_desc" -> Sort.by("name").descending();
                default -> sort;
            };
        }

        Pageable pageable = PageRequest.of(page - 1, limit, sort);
        Specification<Perfume> specification = PerfumeSpecification.filterPerfumes(
                name,
                gender,
                from, to
        );
        Page<Perfume> perfumes = perfumeRepository.findAll(specification, pageable);
        return perfumeMapper.toPublicPageResponse(perfumes);
    }

    public PerfumeDetailsResponseDTO getPerfumeById(int id) {
        Perfume perfume = getPerfumeByIdEntity(id);
        return perfumeMapper.toDetailsResponseDTO(perfume);
    }
}
