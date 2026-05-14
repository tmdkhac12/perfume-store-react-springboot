package com.example.perfume_store.modules.assistant.service;

import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.perfume.PerfumeRepository;
import lombok.AllArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VectorStorageService {

    private final PerfumeRepository perfumeRepository;
    private final VectorStore vectorStore;

    public void loadExistingPerfumesToVectorDb() {
        List<Perfume> perfumes = perfumeRepository.findAll();
        List<Document> documents = perfumes.stream()
                .map(this::convertToDocument)
                .collect(Collectors.toList());

        // Spring AI get content -> embedding model -> vector -> push to Qdrant
        vectorStore.add(documents);
    }

    public void syncPerfume(int perfumeId) {
        perfumeRepository.findById(perfumeId).ifPresent(p -> {
            vectorStore.add(List.of(convertToDocument(p)));
        });
    }

    public void removePerfume(int perfumeId) {
        String documentId = UUID.nameUUIDFromBytes(String.valueOf(perfumeId).getBytes()).toString();
        vectorStore.delete(List.of(documentId));
    }

    private Document convertToDocument(Perfume p) {
        // Gom tất cả thông tin thành một chuỗi văn bản mô tả phong phú (Rich Context)
        String notes = p.getNotePerfumes().stream()
                .map(n -> n.getNote().getName() + " (" + n.getType() + " note)")
                .collect(Collectors.joining(", "));

        String volumes = p.getVolumePerfumes().stream()
                .map(v -> v.getVolume().getVolume() + "ml is priced at " + v.getPrice() + " USD")
                .collect(Collectors.joining("; "));

        String content = String.format(
                "Product: %s. Brand: %s. For: %s. Concentration: %s. " +
                        "Scent Description: %s. " +
                        "Detailed Scent Notes: %s. " +
                        "Available Volumes and Prices: %s.",
                p.getName(), p.getBrand().getName(), p.getGender(),
                p.getConcentration(), p.getDescription(), notes, volumes
        );

        // Metadata helps filtering data when searching vectors
        Map<String, Object> metadata = Map.of(
                "perfume_id", p.getId(),
                "brand_name", p.getBrand().getName(),
                "gender", p.getGender().name(),
                "concentration", p.getConcentration().name(),
                "min_price", p.getMinPrice() != null ? p.getMinPrice().doubleValue() : 0.0
        );

        String documentId = UUID.nameUUIDFromBytes(String.valueOf(p.getId()).getBytes()).toString();

        // Dùng perfume_id làm Document ID để dễ dàng xóa/cập nhật sau này
        return new Document(documentId, content, metadata);
    }

}
