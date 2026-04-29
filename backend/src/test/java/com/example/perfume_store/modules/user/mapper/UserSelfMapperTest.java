package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserSelfMapperTest {

    private UserSelfMapper userSelfMapper;

    @BeforeEach
    void setUp() {
        userSelfMapper = new UserSelfMapperImpl();
    }

    @Test
    @DisplayName("toResponseDTO: Should map User entity to UserPublicResponseDTO")
    void toResponseDTO_EntityToDTO_Success() {
        User entity = new User();
        entity.setId(10);
        entity.setName("Alice");
        entity.setUsername("alice01");
        entity.setEmail("alice@example.com");

        UserPublicResponseDTO dto = userSelfMapper.toResponseDTO(entity);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(entity.getId());
        assertThat(dto.getName()).isEqualTo(entity.getName());
        assertThat(dto.getUsername()).isEqualTo(entity.getUsername());
        assertThat(dto.getEmail()).isEqualTo(entity.getEmail());
    }
}

