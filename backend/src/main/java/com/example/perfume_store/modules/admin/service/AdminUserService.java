package com.example.perfume_store.modules.admin.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.admin.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.admin.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.admin.dtos.response.UserAdminResponseDTO;
import com.example.perfume_store.modules.admin.mapper.AdminMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminUserService {

    // Domain
    private final UserRepository userRepository;

    // This module
    private final AdminMapper adminMapper;

    // Auth module
    private final PasswordEncoder passwordEncoder;

    private User getUserByIdEntity(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Transactional
    public UserAdminResponseDTO adminCreateUser(UserAdminCreateRequestDTO userAdminCreateRequestDTO) {
        // Hash password
        String hashedPassword = passwordEncoder.encode("123");

        // Convert to entity and set the request password to hashed password
        User requestedUser = adminMapper.toEntity(userAdminCreateRequestDTO);
        requestedUser.setHashed_password(hashedPassword);

        // Create user and send the info back to the client
        User createdUser = userRepository.save(requestedUser);
        return adminMapper.toAdminResponseDTO(createdUser);
    }

    @Transactional
    public UserAdminResponseDTO adminUpdateUser(int id, UserAdminUpdateRequestDTO userAdminUpdateRequestDTO) {
        User oldUser = getUserByIdEntity(id);
        adminMapper.updateUser(oldUser, userAdminUpdateRequestDTO);
        User udpatedUser = userRepository.save(oldUser);
        return adminMapper.toAdminResponseDTO(udpatedUser);
    }

    @Transactional
    public UserAdminResponseDTO resetUserPassword(int id) {
        User oldUser = getUserByIdEntity(id);

        String hashedPassword = passwordEncoder.encode("123");
        oldUser.setHashed_password(hashedPassword);

        User udpatedUser = userRepository.save(oldUser);
        return adminMapper.toAdminResponseDTO(udpatedUser);
    }
}
