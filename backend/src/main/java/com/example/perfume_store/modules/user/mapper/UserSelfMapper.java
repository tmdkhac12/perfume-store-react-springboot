package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.dtos.response.UserPublicResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserSelfMapper {

    UserPublicResponseDTO toResponseDTO(User entity);
}
