package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class UserAdminMapperTest {

    private UserAdminMapper userAdminMapper;

    @BeforeEach
    void setUp() {
        userAdminMapper = new UserAdminMapperImpl();
    }

    @Test
    @DisplayName("toEntity: Should map UserAdminCreateRequestDTO to User entity")
    void toEntity_RequestDTOToEntity_Success() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("Bob");
        dto.setUsername("bob01");
        dto.setEmail("bob@example.com");
        dto.setSuperuser(true);
        dto.setActive(false);

        User entity = userAdminMapper.toEntity(dto);

        assertThat(entity).isNotNull();
        assertThat(entity.getName()).isEqualTo(dto.getName());
        assertThat(entity.getUsername()).isEqualTo(dto.getUsername());
        assertThat(entity.getEmail()).isEqualTo(dto.getEmail());
        assertThat(entity.isSuperuser()).isEqualTo(dto.isSuperuser());
        assertThat(entity.isActive()).isEqualTo(dto.isActive());
    }

    @Test
    @DisplayName("toAdminResponseDTO: Should map User entity to UserAdminResponseDTO")
    void toAdminResponseDTO_EntityToDTO_Success() {
        User entity = new User();
        entity.setId(5);
        entity.setName("Carol");
        entity.setUsername("carol");
        entity.setEmail("carol@example.com");
        entity.setSuperuser(false);
        entity.setActive(true);

        UserAdminResponseDTO dto = userAdminMapper.toAdminResponseDTO(entity);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(entity.getId());
        assertThat(dto.getName()).isEqualTo(entity.getName());
        assertThat(dto.getUsername()).isEqualTo(entity.getUsername());
        assertThat(dto.getEmail()).isEqualTo(entity.getEmail());
        assertThat(dto.isSuperuser()).isEqualTo(entity.isSuperuser());
        assertThat(dto.isActive()).isEqualTo(entity.isActive());
    }

    @Test
    @DisplayName("updateUser: Should update existing User entity from UserAdminUpdateRequestDTO")
    void updateUser_UpdateEntity_Success() {
        User existing = new User();
        existing.setId(7);
        existing.setName("Old Name");
        existing.setEmail("old@example.com");
        existing.setSuperuser(false);
        existing.setActive(true);

        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("New Name");
        dto.setEmail("new@example.com");
        dto.setSuperuser(true);
        dto.setActive(false);

        userAdminMapper.updateUser(existing, dto);

        assertThat(existing.getName()).isEqualTo(dto.getName());
        assertThat(existing.getEmail()).isEqualTo(dto.getEmail());
        assertThat(existing.isSuperuser()).isEqualTo(dto.isSuperuser());
        assertThat(existing.isActive()).isEqualTo(dto.isActive());
    }

    @Test
    @DisplayName("toPageResponse: Should map Page<User> to PageResponse<UserAdminResponseDTO> and adjust page number")
    void toPageResponse_PageToPageResponse_Success() {
        User u1 = new User(); u1.setId(1); u1.setName("U1"); u1.setUsername("u1"); u1.setEmail("u1@example.com");
        User u2 = new User(); u2.setId(2); u2.setName("U2"); u2.setUsername("u2"); u2.setEmail("u2@example.com");

        PageRequest pageable = PageRequest.of(1, 2); // page index 1
        Page<User> page = new PageImpl<>(List.of(u1, u2), pageable, 4);

        PageResponse<UserAdminResponseDTO> response = userAdminMapper.toPageResponse(page);

        assertThat(response).isNotNull();
        assertThat(response.getPage()).isEqualTo(page.getNumber() + 1); // mapper uses getNumber()+1
        assertThat(response.getSize()).isEqualTo(page.getSize());
        assertThat(response.getTotalElements()).isEqualTo(page.getTotalElements());
        assertThat(response.getContent()).hasSize(2);
        assertThat(response.getContent()).extracting(UserAdminResponseDTO::getId).containsExactly(1,2);
    }
}

