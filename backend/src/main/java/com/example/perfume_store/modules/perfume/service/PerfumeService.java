package com.example.perfume_store.modules.perfume.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.configs.cloudinary.CloudinaryService;
import com.example.perfume_store.domain.brand.Brand;
import com.example.perfume_store.domain.brand.BrandRepository;
import com.example.perfume_store.domain.note.Note;
import com.example.perfume_store.domain.note.NoteRepository;
import com.example.perfume_store.domain.note_perfume.NotePerfume;
import com.example.perfume_store.domain.note_perfume.NotePerfumeRepository;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import com.example.perfume_store.domain.perfume.PerfumeSpecification;
import com.example.perfume_store.domain.volume.Volume;
import com.example.perfume_store.domain.volume.VolumeRepository;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfumeRepository;
import com.example.perfume_store.modules.perfume.dto.request.PerfumeCreateRequestDTO;
import com.example.perfume_store.modules.perfume.dto.request.PerfumeUpdateRequestDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumeDetailsResponseDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumePublicResponseDTO;
import com.example.perfume_store.modules.perfume.entity.SampleImage;
import com.example.perfume_store.modules.perfume.mapper.PerfumeMapper;
import com.example.perfume_store.modules.perfume.repository.SampleImageRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;
    private final BrandRepository brandRepository;
    private final VolumeRepository volumeRepository;
    private final NoteRepository noteRepository;

    private final VolumePerfumeRepository volumePerfumeRepository;
    private final NotePerfumeRepository notePerfumeRepository;
    private final SampleImageRepository sampleImageRepository;

    private final PerfumeMapper perfumeMapper;

    private final CloudinaryService cloudinaryService;

    private Perfume getPerfumeByIdEntity(int id) {
        return perfumeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Perfume not found"));
    }

    private Brand getBrandByIdEntity(int id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Brand not found"));
    }

    private Volume getVolumeByIdEntity(int id) {
        return volumeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Volume not found"));
    }

    private Note getNoteByIdEntity(int id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Note not found"));
    }

    private List<SampleImage> getCurrentImages(int id) {
        return sampleImageRepository.findAllByPerfumeId(id)
                .orElseThrow(() -> new NotFoundException("Current images not found"));
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

    @Transactional
    public PerfumeDetailsResponseDTO createPerfume(PerfumeCreateRequestDTO request) {
        // Get Brand entity from id
        Brand brand = getBrandByIdEntity(request.getBrandId());

        // 1. Save perfume to database
        Perfume perfume = perfumeMapper.toEntity(request);
        perfume.setBrand(brand);

        Perfume savedPerfume = perfumeRepository.save(perfume);

        // 2. Save volumes for a perfume
        if (request.getVolumes() != null) {
            List<VolumePerfume> volumePerfumes = request.getVolumes()
                    .stream()
                    .map(volumeRequest -> {
                        VolumePerfume vp = new VolumePerfume();
                        vp.setVolume(getVolumeByIdEntity(volumeRequest.getVolumeId()));
                        vp.setPerfume(savedPerfume);
                        vp.setPrice(volumeRequest.getPrice());
                        return vp;
                    })
                    .toList();

            volumePerfumeRepository.saveAll(volumePerfumes);
            savedPerfume.setVolumePerfumes(volumePerfumes);
        }

        // 3. Save notes for a perfume
        if (request.getNotes() != null) {
            List<NotePerfume> notePerfumes = request.getNotes()
                    .stream()
                    .map(noteRequest -> {
                        NotePerfume np = new NotePerfume();
                        np.setPerfume(savedPerfume);
                        np.setNote(getNoteByIdEntity(noteRequest.getNoteId()));
                        np.setType(noteRequest.getType());
                        return np;
                    })
                    .toList();

            notePerfumeRepository.saveAll(notePerfumes);
            savedPerfume.setNotePerfumes(notePerfumes);
        }

        // 4. Save sample images for a perfume
        if (request.getSampleImages() != null) {
            List<SampleImage> sampleImages = handleImageUploads(
                    request.getSampleImages(),
                    savedPerfume
            );
            savedPerfume.setSampleImages(sampleImages);
        }

        // Return
        return perfumeMapper.toDetailsResponseDTO(savedPerfume);
    }

    @Transactional
    public PerfumeDetailsResponseDTO updatePerfume(int id, PerfumeUpdateRequestDTO request) throws BadRequestException {
        // Get the old perfume
        Perfume perfume = getPerfumeByIdEntity(id);

        // Update old basic information
        perfumeMapper.updateEntity(perfume, request);
        perfume.setBrand(getBrandByIdEntity(request.getBrandId()));

        // Delete all volumes and reinsert
        volumePerfumeRepository.deleteAllByPerfumeId(id);
        List<VolumePerfume> newVolumes = request.getVolumes()
                .stream()
                .map(vReq -> {
                    VolumePerfume vp = new VolumePerfume();
                    vp.setVolume(getVolumeByIdEntity(vReq.getVolumeId()));
                    vp.setPrice(vReq.getPrice());
                    vp.setPerfume(perfume);
                    return vp;
                }).toList();
        volumePerfumeRepository.saveAll(newVolumes);
        perfume.setVolumePerfumes(newVolumes);

        // Delete all notes and reinsert
        notePerfumeRepository.deleteAllByPerfumeId(id);
        List<NotePerfume> newNotes = request.getNotes()
                .stream()
                .map(nReq -> {
                    NotePerfume np = new NotePerfume();
                    np.setNote(getNoteByIdEntity(nReq.getNoteId()));
                    np.setType(nReq.getType());
                    np.setPerfume(perfume);
                    return np;
                }).toList();
        notePerfumeRepository.saveAll(newNotes);
        perfume.setNotePerfumes(newNotes);

        // Update images
        List<SampleImage> currentSampleImages = getCurrentImages(id);

        // -- Delete images admin wants
        if (request.getDeleteSampleImages() != null && !request.getDeleteSampleImages().isEmpty()) {
            // Get sample image entity and delete
            List<SampleImage> sampleImagesToBeDeleted = currentSampleImages
                    .stream()
                    .filter(img -> request.getDeleteSampleImages().contains(img.getPath()))
                    .toList();

            sampleImagesToBeDeleted.forEach(img -> {
                cloudinaryService.deleteFileByUrl(img.getPath());
                sampleImageRepository.delete(img);
            });

            // Update cache
            currentSampleImages.removeAll(sampleImagesToBeDeleted);
        }

        // -- Add new images admin wants
        List<SampleImage> newlyAddedSampleImages = new ArrayList<>();
        if (request.getAddSampleImages() != null && !request.getAddSampleImages().isEmpty()) {
            newlyAddedSampleImages = handleImageUploads(request.getAddSampleImages(), perfume);
        }

        // Make sure all images don't be deleted
        if (currentSampleImages.isEmpty() && newlyAddedSampleImages.isEmpty()) {
            throw new BadRequestException("Perfume must have at least one sample image.");
        }

        List<SampleImage> finalSampleImages = new ArrayList<>(currentSampleImages);
        finalSampleImages.addAll(newlyAddedSampleImages);
        perfume.setSampleImages(finalSampleImages);

        return perfumeMapper.toDetailsResponseDTO(perfumeRepository.save(perfume));
    }

    @Transactional
    public void deletePerfume(int id) {
        Perfume perfume = getPerfumeByIdEntity(id);

        if (perfume.getSampleImages() != null) {
            perfume.getSampleImages().forEach(image -> {
                try {
                    cloudinaryService.deleteFileByUrl(image.getPath());
                } catch (Exception e) {
                    log.error("Failed to delete image on Cloudinary: " + image.getPath());
                }
            });
        }

        // Delete perfume in Database
        perfumeRepository.delete(perfume);
    }

    private List<SampleImage> handleImageUploads(List<MultipartFile> sampleImages, Perfume perfume) {
        List<SampleImage> sampleImageList = sampleImages
                .parallelStream()
                .map(file -> {
                    String imageUrl = cloudinaryService.uploadFile(file, "perfumes");

                    SampleImage sampleImage = new SampleImage();
                    sampleImage.setPerfume(perfume);
                    sampleImage.setPath(imageUrl);

                    return sampleImage;
                }).toList();

        return sampleImageRepository.saveAll(sampleImageList);
    }
}
