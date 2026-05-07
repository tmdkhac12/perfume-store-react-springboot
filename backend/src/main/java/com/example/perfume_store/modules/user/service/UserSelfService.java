package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.request.UserPasswordUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserProfileUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserSelfMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserSelfService {

    private final UserRepository userRepository;
    private final UserSelfMapper userSelfMapper;
    private final PasswordEncoder passwordEncoder;

    private User getUserByIdEntity(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public UserPublicResponseDTO getUserById(int userId) {
        User user = getUserByIdEntity(userId);
        return userSelfMapper.toResponseDTO(user);
    }

    @Transactional
    public UserPublicResponseDTO updateProfile(int userId, UserProfileUpdateRequestDTO dto) {
        User user = getUserByIdEntity(userId);
        userSelfMapper.updateFromDTO(dto, user);
        userRepository.save(user);
        return userSelfMapper.toResponseDTO(user);
    }

    @Transactional
    public void updatePassword(int userId, UserPasswordUpdateRequestDTO dto) {
        User user = getUserByIdEntity(userId);

        if (!passwordEncoder.matches(dto.getOldPassword(), user.getHashedPassword())) {
            throw new IllegalArgumentException("Old password does not match");
        }

        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Confirm password does not match");
        }

        user.setHashedPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }
}
