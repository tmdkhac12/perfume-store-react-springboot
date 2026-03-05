package com.example.perfume_store.modules.auth.mapper;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.auth.dto.request.RegisterRequestDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    User toEntity(RegisterRequestDTO registerRequestDTO);
}
