package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.mapper.UserMapper;
import com.example.perfume_store.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public PageResponse<UserAdminResponseDTO> getPaginatedUsers(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<User> users = userRepository.findAll(pageable);
        return userMapper.toPageResponse(users);
    }

    private User getUserByIdEntity(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    // Return Object because this method can return Admin or Public Response DTO
    // base on the permission
    public Object getUserById(int id) {
        User user = getUserByIdEntity(id);
        return userMapper.toAdminResponseDTO(user);
    }

}
