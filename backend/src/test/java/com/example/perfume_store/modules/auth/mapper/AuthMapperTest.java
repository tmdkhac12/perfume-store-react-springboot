package com.example.perfume_store.modules.auth.mapper;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.auth.dto.request.RegisterRequestDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AuthMapperTest {

    private AuthMapper mapper;

    @BeforeEach
    void setUp() {
        // MapStruct generates AuthMapperImpl at build time
        mapper = new AuthMapperImpl();
    }

    @Test
    @DisplayName("toEntity: maps RegisterRequestDTO to User entity")
    void toEntity_mapsFields() {
        RegisterRequestDTO dto = new RegisterRequestDTO();
        dto.setName("Alice");
        dto.setUsername("alice123");
        dto.setEmail("a@b.com");
        dto.setPassword("password");
        dto.setConfirmPassword("password");

        User user = mapper.toEntity(dto);

        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("alice123");
        assertThat(user.getEmail()).isEqualTo("a@b.com");
    }
}

