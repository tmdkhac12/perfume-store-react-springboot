package com.example.perfume_store.configs.ai;

import io.qdrant.client.QdrantClient;
import io.qdrant.client.QdrantGrpcClient;
import io.qdrant.client.grpc.Collections.Distance;
import io.qdrant.client.grpc.Collections.VectorParams;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutionException;

@Configuration
@Slf4j
public class QdrantConfig {

    @Value("${spring.ai.vectorstore.qdrant.host}")
    private String host;

    @Value("${spring.ai.vectorstore.qdrant.port}")
    private int port;

    @Value("${spring.ai.vectorstore.qdrant.collection-name}")
    private String collectionName;

    @PostConstruct
    public void init() throws ExecutionException, InterruptedException {
        QdrantClient client = new QdrantClient(QdrantGrpcClient.newBuilder(host, port, false).build());

        try {
            // Check if collection existed
            boolean exists = client.listCollectionsAsync().get().stream()
                    .anyMatch(c -> c.equals(collectionName));

            if (!exists) {
                log.info("Creating collection: {}", collectionName);
                client.createCollectionAsync(collectionName,
                        VectorParams.newBuilder()
                                .setDistance(Distance.Cosine) // Distance algorithms
                                .setSize(1024) // Vector dimensions
                                .build()).get();
                log.info("Collection created!");
            }
        } finally {
            client.close();
        }
    }
}