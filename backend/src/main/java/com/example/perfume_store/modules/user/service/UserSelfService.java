package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserSelfMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserSelfService {

    private final UserRepository userRepository;
    private final UserSelfMapper userSelfMapper;

    private User getUserByIdEntity(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public UserPublicResponseDTO getUserById(int userId) {
        User user = getUserByIdEntity(userId);
        return userSelfMapper.toResponseDTO(user);
    }
}
