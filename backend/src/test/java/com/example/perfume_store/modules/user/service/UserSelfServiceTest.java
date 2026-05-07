package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.request.UserPasswordUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserProfileUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserSelfMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserSelfService userSelfService;

    private User createUser(int id) {
        User user = new User();
        user.setId(id);
        user.setName("User " + id);
        user.setUsername("user" + id);
        user.setEmail("user" + id + "@example.com");
        user.setHashedPassword("hashed_password");
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

    @Test
    @DisplayName("updateProfile: should update user and return mapped DTO")
    void updateProfile_UserExists_ReturnsUpdatedDTO() {
        int userId = 1;
        User user = createUser(userId);
        UserProfileUpdateRequestDTO dto = new UserProfileUpdateRequestDTO();
        dto.setName("Updated Name");
        dto.setEmail("updated@example.com");

        UserPublicResponseDTO response = new UserPublicResponseDTO();
        response.setName(dto.getName());

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userSelfMapper.toResponseDTO(user)).thenReturn(response);

        UserPublicResponseDTO result = userSelfService.updateProfile(userId, dto);

        assertThat(result.getName()).isEqualTo(dto.getName());
        verify(userSelfMapper).updateFromDTO(dto, user);
        verify(userRepository).save(user);
    }

    @Test
    @DisplayName("updatePassword: should update password when all validations pass")
    void updatePassword_ValidRequest_UpdatesPassword() {
        int userId = 1;
        User user = createUser(userId);
        UserPasswordUpdateRequestDTO dto = new UserPasswordUpdateRequestDTO();
        dto.setOldPassword("old_pass");
        dto.setNewPassword("new_pass");
        dto.setConfirmPassword("new_pass");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(dto.getOldPassword(), user.getHashedPassword())).thenReturn(true);
        when(passwordEncoder.encode(dto.getNewPassword())).thenReturn("new_hashed_password");

        userSelfService.updatePassword(userId, dto);

        assertThat(user.getHashedPassword()).isEqualTo("new_hashed_password");
        verify(userRepository).save(user);
    }

    @Test
    @DisplayName("updatePassword: should throw exception when old password mismatch")
    void updatePassword_OldPasswordMismatch_ThrowsException() {
        int userId = 1;
        User user = createUser(userId);
        UserPasswordUpdateRequestDTO dto = new UserPasswordUpdateRequestDTO();
        dto.setOldPassword("wrong_old_pass");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(dto.getOldPassword(), user.getHashedPassword())).thenReturn(false);

        assertThatThrownBy(() -> userSelfService.updatePassword(userId, dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Old password does not match");

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("updatePassword: should throw exception when confirm password mismatch")
    void updatePassword_ConfirmPasswordMismatch_ThrowsException() {
        int userId = 1;
        User user = createUser(userId);
        UserPasswordUpdateRequestDTO dto = new UserPasswordUpdateRequestDTO();
        dto.setOldPassword("old_pass");
        dto.setNewPassword("new_pass");
        dto.setConfirmPassword("different_pass");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(dto.getOldPassword(), user.getHashedPassword())).thenReturn(true);

        assertThatThrownBy(() -> userSelfService.updatePassword(userId, dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Confirm password does not match");

        verify(userRepository, never()).save(any());
    }
}

