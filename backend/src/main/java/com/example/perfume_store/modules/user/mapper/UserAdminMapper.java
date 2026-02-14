package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface UserAdminMapper {

    User toEntity(UserAdminCreateRequestDTO userAdminCreateRequestDTO);

    UserAdminResponseDTO toAdminResponseDTO(User entity);

    void updateUser(@MappingTarget User user, UserAdminUpdateRequestDTO userAdminUpdateRequestDTO);

    @Mapping(target = "page", expression = "java(userPage.getNumber() + 1)")
    PageResponse<UserAdminResponseDTO> toPageResponse(Page<User> userPage);
}
