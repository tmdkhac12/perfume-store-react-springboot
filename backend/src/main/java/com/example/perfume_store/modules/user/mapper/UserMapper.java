package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.modules.user.dtos.response.UserAdminResponseDTO;
import com.example.perfume_store.domain.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserAdminResponseDTO toAdminResponseDTO(User user);

    List<UserAdminResponseDTO> toAdminResponseDTO(List<User> user);

    @Mapping(target = "page", expression = "java(userPage.getNumber() + 1)")
    PageResponse<UserAdminResponseDTO> toPageResponse(Page<User> userPage);
}
