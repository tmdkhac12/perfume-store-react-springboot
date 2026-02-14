package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.domain.address.Address;
import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAddressResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserAddressMapper {
    UserAddressResponseDTO toResponseDTO(Address entity);

    List<UserAddressResponseDTO> toResponseDTO(List<Address> entities);

    Address toEntity(UserAddressCreateRequestDTO userAddressCreateRequestDTO);

    void updateAddress(@MappingTarget Address oldAddress, UserAddressUpdateRequestDTO userAddressUpdateRequestDTO);
}
