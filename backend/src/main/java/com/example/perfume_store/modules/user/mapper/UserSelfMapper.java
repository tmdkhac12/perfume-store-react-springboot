package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.dtos.request.UserProfileUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserSelfMapper {

    UserPublicResponseDTO toResponseDTO(User entity);

    void updateFromDTO(UserProfileUpdateRequestDTO dto, @MappingTarget User entity);
}
