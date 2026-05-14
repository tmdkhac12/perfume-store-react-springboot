package com.example.perfume_store.modules.assistant.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChatRequestDTO {
    @NotBlank(message = "Message cannot be empty")
    private String message;
    
    private String sessionId;
}
