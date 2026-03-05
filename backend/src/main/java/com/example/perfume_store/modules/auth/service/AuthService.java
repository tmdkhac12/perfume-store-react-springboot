package com.example.perfume_store.modules.auth.service;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.auth.dto.request.RegisterRequestDTO;
import com.example.perfume_store.modules.auth.mapper.AuthMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthMapper authMapper;

    @Transactional
    public boolean registerUser(RegisterRequestDTO registerRequestDTO) {
        String password = registerRequestDTO.getPassword();
        String confirmPassword = registerRequestDTO.getConfirmPassword();

        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Password & confirm password don't match");
        }

        User user = authMapper.toEntity(registerRequestDTO);
        user.setHashedPassword(passwordEncoder.encode(password));
        user.setActive(true);
        userRepository.save(user);
        return true;
    }
}
