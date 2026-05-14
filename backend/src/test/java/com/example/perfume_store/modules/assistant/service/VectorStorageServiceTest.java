package com.example.perfume_store.modules.assistant.service;

import com.example.perfume_store.domain.brand.Brand;
import com.example.perfume_store.domain.note.Note;
import com.example.perfume_store.domain.note_perfume.NotePerfume;
import com.example.perfume_store.domain.note_perfume.NoteType;
import com.example.perfume_store.domain.perfume.Concentration;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import com.example.perfume_store.domain.volume.Volume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VectorStorageServiceTest {

    @Mock
    private PerfumeRepository perfumeRepository;

    @Mock
    private VectorStore vectorStore;

    @InjectMocks
    private VectorStorageService vectorStorageService;

    @Test
    @DisplayName("Should load existing perfumes to vector database with enriched content and metadata")
    void loadExistingPerfumesToVectorDb_ShouldSyncDataCorrectly() {
        // Given
        Brand brand = new Brand();
        brand.setName("Chanel");

        Note note1 = new Note();
        note1.setName("Rose");
        NotePerfume np1 = new NotePerfume();
        np1.setNote(note1);
        np1.setType(NoteType.Top);

        Note note2 = new Note();
        note2.setName("Vanilla");
        NotePerfume np2 = new NotePerfume();
        np2.setNote(note2);
        np2.setType(NoteType.Base);

        Volume v1 = new Volume();
        v1.setVolume(50);
        VolumePerfume vp1 = new VolumePerfume();
        vp1.setVolume(v1);
        vp1.setPrice(new BigDecimal("1500000"));

        Perfume perfume = new Perfume();
        perfume.setId(1);
        perfume.setName("No 5");
        perfume.setBrand(brand);
        perfume.setGender(Gender.Female);
        perfume.setConcentration(Concentration.EDP);
        perfume.setDescription("A classic floral scent.");
        perfume.setNotePerfumes(List.of(np1, np2));
        perfume.setVolumePerfumes(List.of(vp1));
        perfume.setMinPrice(new BigDecimal("1500000"));

        when(perfumeRepository.findAll()).thenReturn(List.of(perfume));

        // When
        vectorStorageService.loadExistingPerfumesToVectorDb();

        // Then
        ArgumentCaptor<List<Document>> captor = ArgumentCaptor.forClass(List.class);
        verify(vectorStore).add(captor.capture());

        List<Document> documents = captor.getValue();
        assertThat(documents).hasSize(1);

        Document doc = documents.get(0);
        assertThat(doc.getId()).isEqualTo("1");
        assertThat(doc.getText()).contains("No 5", "Chanel", "Female", "EDP", "classic floral", "Rose", "Vanilla", "50.0ml", "1500000");
        assertThat(doc.getMetadata())
                .containsEntry("perfume_id", 1)
                .containsEntry("brand_name", "Chanel")
                .containsEntry("gender", "Female")
                .containsEntry("concentration", "EDP")
                .containsEntry("min_price", 1500000.0);
    }

    @Test
    @DisplayName("Should sync individual perfume")
    void syncPerfume_ShouldAddDocumentWithPerfumeId() {
        // Given
        Perfume perfume = new Perfume();
        perfume.setId(42);
        perfume.setName("Bleu de Chanel");
        Brand brand = new Brand();
        brand.setName("Chanel");
        perfume.setBrand(brand);
        perfume.setGender(Gender.Male);
        perfume.setConcentration(Concentration.EDT);
        perfume.setNotePerfumes(List.of());
        perfume.setVolumePerfumes(List.of());

        when(perfumeRepository.findById(42)).thenReturn(java.util.Optional.of(perfume));

        // When
        vectorStorageService.syncPerfume(42);

        // Then
        ArgumentCaptor<List<Document>> captor = ArgumentCaptor.forClass(List.class);
        verify(vectorStore).add(captor.capture());
        assertThat(captor.getValue().get(0).getId()).isEqualTo("42");
    }

    @Test
    @DisplayName("Should remove perfume from vector store")
    void removePerfume_ShouldDeleteById() {
        // When
        vectorStorageService.removePerfume(42);

        // Then
        verify(vectorStore).delete(List.of("42"));
    }
}
