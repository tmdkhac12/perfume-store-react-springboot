package com.example.perfume_store.modules.assistant.service;

import com.example.perfume_store.modules.perfume.event.PerfumeEvent;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@AllArgsConstructor
@Slf4j
public class AssistantEventListener {

    private final VectorStorageService vectorStorageService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handlePerfumeEvent(PerfumeEvent event) {
        log.info("Received PerfumeEvent: operation={}, perfumeId={}", event.getOperation(), event.getPerfumeId());
        
        switch (event.getOperation()) {
            case CREATE, UPDATE -> vectorStorageService.syncPerfume(event.getPerfumeId());
            case DELETE -> vectorStorageService.removePerfume(event.getPerfumeId());
        }
    }
}
