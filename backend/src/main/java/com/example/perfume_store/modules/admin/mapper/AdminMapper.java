package com.example.perfume_store.modules.admin.mapper;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.admin.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.admin.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.admin.dtos.response.UserAdminResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    User toEntity(UserAdminCreateRequestDTO userAdminCreateRequestDTO);

    UserAdminResponseDTO toAdminResponseDTO(User entity);

    void updateUser(@MappingTarget User user, UserAdminUpdateRequestDTO userAdminUpdateRequestDTO);
}
