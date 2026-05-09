package com.example.perfume_store.common.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class AddressValidator {

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    private Map<String, List<String>> provinceMap = new HashMap<>();

    public Map<String, List<String>> getProvinceMap() {
        return provinceMap;
    }

    @PostConstruct
    public void init() {
        try {
            Resource resource = resourceLoader.getResource("classpath:data/provinces.json");
            try (InputStream inputStream = resource.getInputStream()) {
                List<ProvinceData> data = objectMapper.readValue(inputStream, new TypeReference<List<ProvinceData>>() {});
                for (ProvinceData province : data) {
                    provinceMap.put(province.getName(), province.getWards());
                }
            }
            log.info("Loaded {} provinces for validation", provinceMap.size());
        } catch (Exception e) {
            log.error("Failed to load provinces.json", e);
        }
    }

    public void validate(String cityName, String wardName) {
        if (!provinceMap.containsKey(cityName)) {
            throw new IllegalArgumentException("Invalid city name: " + cityName);
        }
        List<String> wards = provinceMap.get(cityName);
        if (!wards.contains(wardName)) {
            throw new IllegalArgumentException("Invalid ward name: " + wardName + " for city: " + cityName);
        }
    }

    @Data
    private static class ProvinceData {
        private String name;
        private List<String> wards;
    }
}
