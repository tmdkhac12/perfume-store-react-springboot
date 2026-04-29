package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserAdminMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserAdminServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserAdminMapper userAdminMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserAdminService userAdminService;

    // --- Helper factories ---

    private User createUser(int id) {
        User user = new User();
        user.setId(id);
        user.setName("User " + id);
        user.setUsername("user" + id);
        user.setEmail("user" + id + "@example.com");
        user.setSuperuser(false);
        user.setActive(true);
        return user;
    }

    @Test
    @DisplayName("getPaginatedUsers: should map Page<User> to PageResponse")
    void getPaginatedUsers_MapsPageResponse() {
        PageRequest pageable = PageRequest.of(1, 2);
        Page<User> userPage = new PageImpl<>(List.of(createUser(1), createUser(2)), pageable, 4);
        PageResponse<UserAdminResponseDTO> response = new PageResponse<>();

        when(userRepository.findAll(pageable)).thenReturn(userPage);
        when(userAdminMapper.toPageResponse(userPage)).thenReturn(response);

        PageResponse<UserAdminResponseDTO> result = userAdminService.getPaginatedUsers(2, 2);

        assertThat(result).isEqualTo(response);
        verify(userRepository).findAll(pageable);
        verify(userAdminMapper).toPageResponse(userPage);
    }

    @Test
    @DisplayName("getUserById: should return mapped DTO when user exists")
    void getUserById_UserExists_ReturnsDTO() {
        int userId = 10;
        User user = createUser(userId);
        UserAdminResponseDTO responseDTO = new UserAdminResponseDTO();
        responseDTO.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userAdminMapper.toAdminResponseDTO(user)).thenReturn(responseDTO);

        UserAdminResponseDTO result = userAdminService.getUserById(userId);

        assertThat(result).isEqualTo(responseDTO);
        verify(userRepository).findById(userId);
        verify(userAdminMapper).toAdminResponseDTO(user);
    }

    @Test
    @DisplayName("getUserById: should throw NotFoundException when user not found")
    void getUserById_UserNotFound_ThrowsNotFound() {
        int userId = 10;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAdminService.getUserById(userId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verifyNoInteractions(userAdminMapper);
    }

    @Test
    @DisplayName("adminCreateUser: should hash password, save user, and return DTO")
    void adminCreateUser_HashesPassword_SavesAndReturnsDTO() {
        UserAdminCreateRequestDTO request = new UserAdminCreateRequestDTO();
        request.setName("Admin");
        request.setUsername("admin");
        request.setEmail("admin@example.com");

        User mapped = new User();
        User saved = new User();
        saved.setId(1);
        UserAdminResponseDTO responseDTO = new UserAdminResponseDTO();
        responseDTO.setId(1);

        when(passwordEncoder.encode("123")).thenReturn("hashed");
        when(userAdminMapper.toEntity(request)).thenReturn(mapped);
        when(userRepository.save(mapped)).thenReturn(saved);
        when(userAdminMapper.toAdminResponseDTO(saved)).thenReturn(responseDTO);

        UserAdminResponseDTO result = userAdminService.adminCreateUser(request);

        assertThat(result).isEqualTo(responseDTO);
        assertThat(mapped.getHashedPassword()).isEqualTo("hashed");
        verify(passwordEncoder).encode("123");
        verify(userAdminMapper).toEntity(request);
        verify(userRepository).save(mapped);
        verify(userAdminMapper).toAdminResponseDTO(saved);
    }

    @Test
    @DisplayName("adminUpdateUser: should update user and return DTO")
    void adminUpdateUser_UserExists_UpdatesAndReturnsDTO() {
        int userId = 3;
        User existing = createUser(userId);
        User updated = createUser(userId);
        updated.setName("Updated");
        UserAdminUpdateRequestDTO request = new UserAdminUpdateRequestDTO();
        request.setName("Updated");
        request.setEmail("updated@example.com");
        request.setSuperuser(true);
        request.setActive(false);

        UserAdminResponseDTO responseDTO = new UserAdminResponseDTO();
        responseDTO.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(existing));
        doAnswer(invocation -> {
            User target = invocation.getArgument(0);
            UserAdminUpdateRequestDTO dto = invocation.getArgument(1);
            target.setName(dto.getName());
            target.setEmail(dto.getEmail());
            target.setSuperuser(dto.isSuperuser());
            target.setActive(dto.isActive());
            return null;
        }).when(userAdminMapper).updateUser(eq(existing), eq(request));
        when(userRepository.save(existing)).thenReturn(updated);
        when(userAdminMapper.toAdminResponseDTO(updated)).thenReturn(responseDTO);

        UserAdminResponseDTO result = userAdminService.adminUpdateUser(userId, request);

        assertThat(result).isEqualTo(responseDTO);
        verify(userRepository).findById(userId);
        verify(userAdminMapper).updateUser(existing, request);
        verify(userRepository).save(existing);
        verify(userAdminMapper).toAdminResponseDTO(updated);
    }

    @Test
    @DisplayName("adminUpdateUser: should throw NotFoundException when user not found")
    void adminUpdateUser_UserNotFound_ThrowsNotFound() {
        int userId = 3;
        UserAdminUpdateRequestDTO request = new UserAdminUpdateRequestDTO();

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAdminService.adminUpdateUser(userId, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verifyNoInteractions(userAdminMapper);
    }

    @Test
    @DisplayName("resetUserPassword: should hash password, save user, and return DTO")
    void resetUserPassword_UserExists_ResetsPassword() {
        int userId = 12;
        User existing = createUser(userId);
        User saved = createUser(userId);
        UserAdminResponseDTO responseDTO = new UserAdminResponseDTO();
        responseDTO.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(existing));
        when(passwordEncoder.encode("123")).thenReturn("hashed");
        when(userRepository.save(existing)).thenReturn(saved);
        when(userAdminMapper.toAdminResponseDTO(saved)).thenReturn(responseDTO);

        UserAdminResponseDTO result = userAdminService.resetUserPassword(userId);

        assertThat(existing.getHashedPassword()).isEqualTo("hashed");
        assertThat(result).isEqualTo(responseDTO);
        verify(passwordEncoder).encode("123");
        verify(userRepository).findById(userId);
        verify(userRepository).save(existing);
        verify(userAdminMapper).toAdminResponseDTO(saved);
    }

    @Test
    @DisplayName("resetUserPassword: should throw NotFoundException when user not found")
    void resetUserPassword_UserNotFound_ThrowsNotFound() {
        int userId = 12;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAdminService.resetUserPassword(userId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verifyNoInteractions(passwordEncoder, userAdminMapper);
    }
}

