package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserAdminMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserAdminService {

    private final UserRepository userRepository;
    private final UserAdminMapper userAdminMapper;

    // Security module
    private final PasswordEncoder passwordEncoder;

    private User getUserByIdEntity(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public PageResponse<UserAdminResponseDTO> getPaginatedUsers(int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<User> users = userRepository.findAll(pageable);
        return userAdminMapper.toPageResponse(users);
    }

    public UserAdminResponseDTO getUserById(int id) {
        User user = getUserByIdEntity(id);
        return userAdminMapper.toAdminResponseDTO(user);
    }

    @Transactional
    public UserAdminResponseDTO adminCreateUser(UserAdminCreateRequestDTO userAdminCreateRequestDTO) {
        // Hash password
        String hashedPassword = passwordEncoder.encode("123");

        // Convert to entity and set the request password to hashed password
        User requestedUser = userAdminMapper.toEntity(userAdminCreateRequestDTO);
        requestedUser.setHashedPassword(hashedPassword);

        // Create user and send the info back to the client
        User createdUser = userRepository.save(requestedUser);
        return userAdminMapper.toAdminResponseDTO(createdUser);
    }

    @Transactional
    public UserAdminResponseDTO adminUpdateUser(int id, UserAdminUpdateRequestDTO userAdminUpdateRequestDTO) {
        User oldUser = getUserByIdEntity(id);
        userAdminMapper.updateUser(oldUser, userAdminUpdateRequestDTO);
        User udpatedUser = userRepository.save(oldUser);
        return userAdminMapper.toAdminResponseDTO(udpatedUser);
    }

    @Transactional
    public UserAdminResponseDTO resetUserPassword(int id) {
        User oldUser = getUserByIdEntity(id);

        String hashedPassword = passwordEncoder.encode("123");
        oldUser.setHashedPassword(hashedPassword);

        User udpatedUser = userRepository.save(oldUser);
        return userAdminMapper.toAdminResponseDTO(udpatedUser);
    }
}
