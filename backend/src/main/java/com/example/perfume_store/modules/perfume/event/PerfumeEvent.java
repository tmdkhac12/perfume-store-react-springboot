package com.example.perfume_store.modules.perfume.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class PerfumeEvent extends ApplicationEvent {
    private final int perfumeId;
    private final Operation operation;

    public enum Operation {
        CREATE, UPDATE, DELETE
    }

    public PerfumeEvent(Object source, int perfumeId, Operation operation) {
        super(source);
        this.perfumeId = perfumeId;
        this.operation = operation;
    }
}
