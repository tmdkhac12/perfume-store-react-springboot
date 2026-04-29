package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.domain.address.Address;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAddressResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class UserAddressMapperTest {

    private UserAddressMapper userAddressMapper;

    @BeforeEach
    void setUp() {
        userAddressMapper = new UserAddressMapperImpl();
    }

    @Test
    @DisplayName("toResponseDTO: Should map Address entity to UserAddressResponseDTO")
    void toResponseDTO_EntityToDTO_Success() {
        Address address = new Address();
        address.setId(11);
        User user = new User(); user.setId(3);
        address.setUser(user);
        address.setReceiver("Receiver Name");
        address.setPhoneNumber("0123456789");
        address.setCityName("City");
        address.setWardName("Ward");
        address.setDeliveryAddress("Addr");
        address.setHide(false);

        UserAddressResponseDTO dto = userAddressMapper.toResponseDTO(address);

        assertThat(dto).isNotNull();
        assertThat(dto.getId()).isEqualTo(address.getId());
        assertThat(dto.getReceiver()).isEqualTo(address.getReceiver());
        assertThat(dto.getPhoneNumber()).isEqualTo(address.getPhoneNumber());
        assertThat(dto.getCityName()).isEqualTo(address.getCityName());
        assertThat(dto.getWardName()).isEqualTo(address.getWardName());
        assertThat(dto.getDeliveryAddress()).isEqualTo(address.getDeliveryAddress());
        assertThat(dto.isHide()).isEqualTo(address.isHide());
    }

    @Test
    @DisplayName("toResponseDTO(List): Should map list of Address to list of DTOs")
    void toResponseDTO_ListEntitiesToListDTOs_Success() {
        Address a1 = new Address(); a1.setReceiver("A1");
        Address a2 = new Address(); a2.setReceiver("A2");

        List<UserAddressResponseDTO> result = userAddressMapper.toResponseDTO(List.of(a1, a2));

        assertThat(result).hasSize(2);
        assertThat(result).extracting(UserAddressResponseDTO::getReceiver).containsExactly("A1","A2");
    }

    @Test
    @DisplayName("toEntity: Should map UserAddressCreateRequestDTO to Address entity")
    void toEntity_RequestDTOToEntity_Success() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("R");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("City");
        dto.setWardName("Ward");
        dto.setDeliveryAddress("Addr");

        Address entity = userAddressMapper.toEntity(dto);

        assertThat(entity).isNotNull();
        assertThat(entity.getReceiver()).isEqualTo(dto.getReceiver());
        assertThat(entity.getPhoneNumber()).isEqualTo(dto.getPhoneNumber());
        assertThat(entity.getCityName()).isEqualTo(dto.getCityName());
        assertThat(entity.getWardName()).isEqualTo(dto.getWardName());
        assertThat(entity.getDeliveryAddress()).isEqualTo(dto.getDeliveryAddress());
    }

    @Test
    @DisplayName("updateAddress: Should update existing Address from UserAddressUpdateRequestDTO")
    void updateAddress_UpdateEntity_Success() {
        Address existing = new Address();
        existing.setReceiver("Old");
        existing.setPhoneNumber("0123456789");
        existing.setCityName("OldCity");
        existing.setWardName("OldWard");
        existing.setDeliveryAddress("OldAddr");

        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("New");
        dto.setPhoneNumber("+84123456789");
        dto.setCityName("NewCity");
        dto.setWardName("NewWard");
        dto.setDeliveryAddress("NewAddr");
        dto.setHide(true);

        userAddressMapper.updateAddress(existing, dto);

        assertThat(existing.getReceiver()).isEqualTo(dto.getReceiver());
        assertThat(existing.getPhoneNumber()).isEqualTo(dto.getPhoneNumber());
        assertThat(existing.getCityName()).isEqualTo(dto.getCityName());
        assertThat(existing.getWardName()).isEqualTo(dto.getWardName());
        assertThat(existing.getDeliveryAddress()).isEqualTo(dto.getDeliveryAddress());
        assertThat(existing.isHide()).isEqualTo(dto.isHide());
    }
}

