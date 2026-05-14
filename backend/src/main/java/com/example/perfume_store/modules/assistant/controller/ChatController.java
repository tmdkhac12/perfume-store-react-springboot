package com.example.perfume_store.modules.assistant.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.modules.assistant.dto.request.ChatRequestDTO;
import com.example.perfume_store.modules.assistant.dto.response.ChatResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY;
import static org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor.CHAT_MEMORY_RETRIEVE_SIZE_KEY;

@RestController
@RequestMapping("/api/v1/bot")
@Slf4j
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder, VectorStore vectorStore, ChatMemory chatMemory) {
        this.chatClient = builder
                .defaultAdvisors(
                        // RAG Flow: User Message -> Vectorize -> Search Qdrant -> Add Result to Prompt Context
                        new QuestionAnswerAdvisor(vectorStore, SearchRequest.builder()
                                .topK(5)
                                .similarityThreshold(0.55)
                                .build()),
                        new MessageChatMemoryAdvisor(chatMemory)
                )
                .defaultSystem("""
                        You are a premium perfume consultant at the Perfume Store.
                        Your mission is to assist customers in finding the most suitable perfume based on their preferences, gender, scent concentration, and budget.
                        
                        When consulting:
                        1. Always maintain a polite, professional, and enthusiastic attitude.
                        2. Use detailed information about scent notes (Top, Heart, Base notes) to describe the fragrance emotionally.
                        3. If a customer asks about the price, provide information on the available volumes and their corresponding prices.
                        4. Only consult based on the product list provided in the context. If no suitable product is found, politely inform them and suggest providing other criteria.
                        5. Always prioritize providing accurate brand and product names.
                        
                        Start by warmly welcoming the customer when they begin the conversation.
                        """)
                .build();
    }

    @PostMapping("/consult")
    public ResponseEntity<?> chat(@Valid @RequestBody ChatRequestDTO requestDTO, HttpServletRequest request) {
        String sessionId = requestDTO.getSessionId() != null ? requestDTO.getSessionId() : UUID.randomUUID().toString();
        
        try {
            // Execution Flow: 
            // 1. Get user message -> 2. Advisors intercept (Retrieve Context & History) -> 
            // 3. Form final Prompt (System + History + Context + User Msg) -> 4. Call LLM (Groq) -> 5. Return Content
            String aiResponse = chatClient.prompt()
                    .user(requestDTO.getMessage())
                    .advisors(a -> a
                            .param(CHAT_MEMORY_CONVERSATION_ID_KEY, sessionId)
                            .param(CHAT_MEMORY_RETRIEVE_SIZE_KEY, 10))
                    .call()
                    .content();

            ChatResponseDTO responseDTO = ChatResponseDTO.builder()
                    .response(aiResponse)
                    .sessionId(sessionId)
                    .build();

            return ApiResponseFactory.success(responseDTO, "Consultation successful", HttpStatus.OK, request);
        } catch (Exception e) {
            log.error("Error during AI consultation: ", e);
            return ApiResponseFactory.error(HttpStatus.SERVICE_UNAVAILABLE, "AI Assistant is currently unavailable. Please try again later.", request);
        }
    }
}
