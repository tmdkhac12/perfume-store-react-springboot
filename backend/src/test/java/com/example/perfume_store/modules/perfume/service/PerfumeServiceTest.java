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
import com.example.perfume_store.domain.note_perfume.NoteType;
import com.example.perfume_store.domain.perfume.Concentration;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import com.example.perfume_store.domain.volume.Volume;
import com.example.perfume_store.domain.volume.VolumeRepository;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfumeRepository;
import com.example.perfume_store.modules.perfume.dto.request.NotePerfumeRequestDTO;
import com.example.perfume_store.modules.perfume.dto.request.PerfumeCreateRequestDTO;
import com.example.perfume_store.modules.perfume.dto.request.PerfumeUpdateRequestDTO;
import com.example.perfume_store.modules.perfume.dto.request.VolumePerfumeRequestDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumeDetailsResponseDTO;
import com.example.perfume_store.modules.perfume.dto.response.PerfumePublicResponseDTO;
import com.example.perfume_store.modules.perfume.entity.SampleImage;
import com.example.perfume_store.modules.perfume.mapper.PerfumeMapper;
import com.example.perfume_store.modules.perfume.repository.SampleImageRepository;
import org.apache.coyote.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PerfumeServiceTest {

    @Mock
    private PerfumeRepository perfumeRepository;
    @Mock
    private BrandRepository brandRepository;
    @Mock
    private VolumeRepository volumeRepository;
    @Mock
    private NoteRepository noteRepository;
    @Mock
    private VolumePerfumeRepository volumePerfumeRepository;
    @Mock
    private NotePerfumeRepository notePerfumeRepository;
    @Mock
    private SampleImageRepository sampleImageRepository;
    @Mock
    private PerfumeMapper perfumeMapper;
    @Mock
    private CloudinaryService cloudinaryService;

    @InjectMocks
    private PerfumeService perfumeService;

    // --- getPaginatedPerfumes ---

    @Test
    @DisplayName("getPaginatedPerfumes: Should return PageResponse of PerfumePublicResponseDTO")
    void getPaginatedPerfumes_Success() {
        // Arrange
        int page = 1, limit = 10;
        Page<Perfume> perfumePage = new PageImpl<>(List.of(createPerfume(1, "Chanel")));
        PageResponse<PerfumePublicResponseDTO> response = new PageResponse<>();

        when(perfumeRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(perfumePage);
        when(perfumeMapper.toPublicPageResponse(perfumePage)).thenReturn(response);

        // Act
        PageResponse<PerfumePublicResponseDTO> result = perfumeService.getPaginatedPerfumes(page, limit, null, null, null, null, null);

        // Assert
        assertThat(result).isNotNull();
        verify(perfumeRepository).findAll(any(Specification.class), any(Pageable.class));
    }

    // --- getPerfumeById ---

    @Test
    @DisplayName("getPerfumeById: Should return PerfumeDetailsResponseDTO when ID exists")
    void getPerfumeById_Success() {
        int id = 1;
        Perfume perfume = createPerfume(id, "Chanel");
        PerfumeDetailsResponseDTO response = new PerfumeDetailsResponseDTO();

        when(perfumeRepository.findById(id)).thenReturn(Optional.of(perfume));
        when(perfumeMapper.toDetailsResponseDTO(perfume)).thenReturn(response);

        PerfumeDetailsResponseDTO result = perfumeService.getPerfumeById(id);

        assertThat(result).isNotNull();
    }

    @Test
    @DisplayName("getPerfumeById: Should throw NotFoundException when ID not found")
    void getPerfumeById_NotFound() {
        int id = 1;
        when(perfumeRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> perfumeService.getPerfumeById(id))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Perfume not found");
    }

    // --- createPerfume ---

    @Test
    @DisplayName("createPerfume: Should save perfume and related entities successfully")
    void createPerfume_Success() {
        // Arrange
        PerfumeCreateRequestDTO request = createPerfumeCreateRequestDTO("New Perfume");
        Brand brand = createBrand(1, "Chanel");
        Perfume perfume = createPerfume(0, "New Perfume");
        Perfume savedPerfume = createPerfume(1, "New Perfume");
        Volume volume = createVolume(1, 100);
        Note note = createNote(1, "Rose");
        MultipartFile mockFile = mock(MultipartFile.class);
        request.setSampleImages(List.of(mockFile));

        when(brandRepository.findById(1)).thenReturn(Optional.of(brand));
        when(perfumeMapper.toEntity(request)).thenReturn(perfume);
        when(perfumeRepository.save(perfume)).thenReturn(savedPerfume);
        when(volumeRepository.findById(1)).thenReturn(Optional.of(volume));
        when(noteRepository.findById(1)).thenReturn(Optional.of(note));
        when(cloudinaryService.uploadFile(any(), anyString())).thenReturn("imageUrl");
        when(perfumeMapper.toDetailsResponseDTO(any())).thenReturn(new PerfumeDetailsResponseDTO());

        // Act
        PerfumeDetailsResponseDTO result = perfumeService.createPerfume(request);

        // Assert
        assertThat(result).isNotNull();
        verify(perfumeRepository).save(perfume);
        verify(volumePerfumeRepository).saveAll(anyList());
        verify(notePerfumeRepository).saveAll(anyList());
        verify(sampleImageRepository).saveAll(anyList());
    }

    // --- updatePerfume ---

    @Test
    @DisplayName("updatePerfume: Should update successfully")
    void updatePerfume_Success() throws BadRequestException {
        // Arrange
        int id = 1;
        Perfume perfume = createPerfume(id, "Old Name");
        PerfumeUpdateRequestDTO request = createPerfumeUpdateRequestDTO("Updated Name");
        Brand brand = createBrand(1, "Chanel");
        Volume volume = createVolume(1, 100);
        Note note = createNote(1, "Rose");
        List<SampleImage> currentImages = new ArrayList<>(perfume.getSampleImages());

        when(perfumeRepository.findById(id)).thenReturn(Optional.of(perfume));
        when(brandRepository.findById(1)).thenReturn(Optional.of(brand));
        when(volumeRepository.findById(1)).thenReturn(Optional.of(volume));
        when(noteRepository.findById(1)).thenReturn(Optional.of(note));
        when(sampleImageRepository.findAllByPerfumeId(id)).thenReturn(Optional.of(currentImages));
        when(perfumeRepository.save(any())).thenReturn(perfume);
        when(perfumeMapper.toDetailsResponseDTO(any())).thenReturn(new PerfumeDetailsResponseDTO());

        // Act
        PerfumeDetailsResponseDTO result = perfumeService.updatePerfume(id, request);

        // Assert
        assertThat(result).isNotNull();
        verify(perfumeMapper).updateEntity(perfume, request);
        verify(volumePerfumeRepository).deleteAllByPerfumeId(id);
        verify(notePerfumeRepository).deleteAllByPerfumeId(id);
        verify(perfumeRepository, atLeastOnce()).save(perfume);
    }

    @Test
    @DisplayName("updatePerfume: Should throw BadRequestException when deleting all images")
    void updatePerfume_NoImages_ThrowsBadRequest() {
        // Arrange
        int id = 1;
        Perfume perfume = createPerfume(id, "Name");
        PerfumeUpdateRequestDTO request = createPerfumeUpdateRequestDTO("Name");
        request.setDeleteSampleImages(List.of("url1")); // Delete the only image
        request.setAddSampleImages(null);

        when(perfumeRepository.findById(id)).thenReturn(Optional.of(perfume));
        when(brandRepository.findById(1)).thenReturn(Optional.of(createBrand(1, "B")));
        when(volumeRepository.findById(1)).thenReturn(Optional.of(createVolume(1, 50)));
        when(noteRepository.findById(1)).thenReturn(Optional.of(createNote(1, "A")));
        when(sampleImageRepository.findAllByPerfumeId(id)).thenReturn(Optional.of(new ArrayList<>(perfume.getSampleImages())));

        // Act & Assert
        assertThatThrownBy(() -> perfumeService.updatePerfume(id, request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("Perfume must have at least one sample image.");
    }

    // --- deletePerfume ---

    @Test
    @DisplayName("deletePerfume: Should delete perfume and call Cloudinary")
    void deletePerfume_Success() {
        // Arrange
        int id = 1;
        Perfume perfume = createPerfume(id, "Name");
        when(perfumeRepository.findById(id)).thenReturn(Optional.of(perfume));

        // Act
        perfumeService.deletePerfume(id);

        // Assert
        verify(cloudinaryService).deleteFileByUrl("url1");
        verify(perfumeRepository).delete(perfume);
    }

    // --- Private Helper Methods (Data Factories) ---

    private Perfume createPerfume(int id, String name) {
        Perfume perfume = new Perfume();
        perfume.setId(id);
        perfume.setName(name);
        perfume.setGender(Gender.Unisex);
        perfume.setConcentration(Concentration.EDP);
        perfume.setDescription("Description");
        perfume.setBrand(createBrand(1, "Chanel"));

        List<SampleImage> images = new ArrayList<>();
        images.add(createSampleImage(1, "url1", perfume));
        perfume.setSampleImages(images);

        return perfume;
    }

    private Brand createBrand(int id, String name) {
        Brand brand = new Brand();
        brand.setId(id);
        brand.setName(name);
        return brand;
    }

    private SampleImage createSampleImage(int id, String path, Perfume perfume) {
        SampleImage image = new SampleImage();
        image.setId(id);
        image.setPath(path);
        image.setPerfume(perfume);
        return image;
    }

    private Volume createVolume(int id, int value) {
        Volume volume = new Volume();
        volume.setId(id);
        volume.setVolume(value);
        return volume;
    }

    private Note createNote(int id, String name) {
        Note note = new Note();
        note.setId(id);
        note.setName(name);
        return note;
    }

    private PerfumeCreateRequestDTO createPerfumeCreateRequestDTO(String name) {
        PerfumeCreateRequestDTO dto = new PerfumeCreateRequestDTO();
        dto.setName(name);
        dto.setDescription("Description");
        dto.setGender(Gender.Unisex);
        dto.setConcentration(Concentration.EDP);
        dto.setBrandId(1);

        VolumePerfumeRequestDTO vReq = new VolumePerfumeRequestDTO();
        vReq.setVolumeId(1);
        vReq.setPrice(new BigDecimal("100.00"));
        dto.setVolumes(List.of(vReq));

        NotePerfumeRequestDTO nReq = new NotePerfumeRequestDTO();
        nReq.setNoteId(1);
        nReq.setType(NoteType.Top);
        dto.setNotes(List.of(nReq));

        return dto;
    }

    private PerfumeUpdateRequestDTO createPerfumeUpdateRequestDTO(String name) {
        PerfumeUpdateRequestDTO dto = new PerfumeUpdateRequestDTO();
        dto.setName(name);
        dto.setDescription("Description");
        dto.setGender(Gender.Unisex);
        dto.setConcentration(Concentration.EDP);
        dto.setBrandId(1);

        VolumePerfumeRequestDTO vReq = new VolumePerfumeRequestDTO();
        vReq.setVolumeId(1);
        vReq.setPrice(new BigDecimal("120.00"));
        dto.setVolumes(List.of(vReq));

        NotePerfumeRequestDTO nReq = new NotePerfumeRequestDTO();
        nReq.setNoteId(1);
        nReq.setType(NoteType.Heart);
        dto.setNotes(List.of(nReq));

        return dto;
    }
}
