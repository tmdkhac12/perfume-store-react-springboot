package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserSelfMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserSelfServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserSelfMapper userSelfMapper;

    @InjectMocks
    private UserSelfService userSelfService;

    private User createUser(int id) {
        User user = new User();
        user.setId(id);
        user.setName("User " + id);
        user.setUsername("user" + id);
        user.setEmail("user" + id + "@example.com");
        return user;
    }

    @Test
    @DisplayName("getUserById: should return mapped DTO when user exists")
    void getUserById_UserExists_ReturnsDTO() {
        int userId = 1;
        User user = createUser(userId);
        UserPublicResponseDTO response = new UserPublicResponseDTO();
        response.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userSelfMapper.toResponseDTO(user)).thenReturn(response);

        UserPublicResponseDTO result = userSelfService.getUserById(userId);

        assertThat(result).isEqualTo(response);
        verify(userRepository).findById(userId);
        verify(userSelfMapper).toResponseDTO(user);
    }

    @Test
    @DisplayName("getUserById: should throw NotFoundException when user not found")
    void getUserById_UserNotFound_ThrowsNotFound() {
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userSelfService.getUserById(userId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verifyNoInteractions(userSelfMapper);
    }
}

