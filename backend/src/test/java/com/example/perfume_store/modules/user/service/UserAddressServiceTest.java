package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.utils.AddressValidator;
import com.example.perfume_store.domain.address.Address;
import com.example.perfume_store.domain.address.AddressRepository;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAddressResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserAddressMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserAddressServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private UserAddressMapper userAddressMapper;

    @Mock
    private AddressValidator addressValidator;

    @InjectMocks
    private UserAddressService userAddressService;

    // --- Helper factories ---

    private User createUser(int id) {
        User user = new User();
        user.setId(id);
        user.setName("User " + id);
        return user;
    }

    private Address createAddress(int id, int userId) {
        Address address = new Address();
        address.setId(id);
        User user = createUser(userId);
        address.setUser(user);
        address.setReceiver("Receiver");
        address.setPhoneNumber("0123456789");
        address.setCityName("City");
        address.setWardName("Ward");
        address.setDeliveryAddress("Addr");
        address.setHide(false);
        return address;
    }

    private UserAddressResponseDTO createResponseDTO(int id) {
        UserAddressResponseDTO dto = new UserAddressResponseDTO();
        dto.setId(id);
        dto.setReceiver("Receiver");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("City");
        dto.setWardName("Ward");
        dto.setDeliveryAddress("Addr");
        dto.setHide(false);
        return dto;
    }

    @Test
    @DisplayName("getAllUserAddresses: should return mapped list from repository")
    void getAllUserAddresses_ReturnsMappedList() {
        int userId = 1;
        List<Address> addresses = List.of(createAddress(1, userId), createAddress(2, userId));
        List<UserAddressResponseDTO> mapped = List.of(createResponseDTO(1), createResponseDTO(2));

        when(addressRepository.findByUserId(userId)).thenReturn(addresses);
        when(userAddressMapper.toResponseDTO(addresses)).thenReturn(mapped);

        List<UserAddressResponseDTO> result = userAddressService.getAllUserAddresses(userId);

        assertThat(result).hasSize(2);
        assertThat(result).isEqualTo(mapped);
        verify(addressRepository).findByUserId(userId);
        verify(userAddressMapper).toResponseDTO(addresses);
    }

    @Test
    @DisplayName("createUserAddress: should create and map address when user exists")
    void createUserAddress_UserExists_Success() {
        int userId = 5;
        User user = createUser(userId);
        UserAddressCreateRequestDTO request = new UserAddressCreateRequestDTO();
        request.setReceiver("Receiver");
        request.setPhoneNumber("0123456789");
        request.setCityName("City");
        request.setWardName("Ward");
        request.setDeliveryAddress("Addr");

        Address mappedEntity = new Address();
        UserAddressResponseDTO responseDTO = createResponseDTO(10);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userAddressMapper.toEntity(request)).thenReturn(mappedEntity);
        when(addressRepository.save(mappedEntity)).thenReturn(mappedEntity);
        when(userAddressMapper.toResponseDTO(mappedEntity)).thenReturn(responseDTO);

        UserAddressResponseDTO result = userAddressService.createUserAddress(userId, request);

        assertThat(result).isEqualTo(responseDTO);
        assertThat(mappedEntity.getUser()).isEqualTo(user);
        verify(userRepository).findById(userId);
        verify(userAddressMapper).toEntity(request);
        verify(addressRepository).save(mappedEntity);
        verify(userAddressMapper).toResponseDTO(mappedEntity);
    }

    @Test
    @DisplayName("createUserAddress: should throw NotFoundException when user not found")
    void createUserAddress_UserNotFound_ThrowsNotFound() {
        int userId = 999;
        UserAddressCreateRequestDTO request = new UserAddressCreateRequestDTO();

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAddressService.createUserAddress(userId, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("User not found");

        verify(userRepository).findById(userId);
        verifyNoInteractions(addressRepository, userAddressMapper);
    }

    @Test
    @DisplayName("updateUserAddress: should update address when it belongs to user")
    void updateUserAddress_AddressBelongsToUser_Success() {
        int userId = 3;
        int addressId = 7;
        Address address = createAddress(addressId, userId);

        UserAddressUpdateRequestDTO request = new UserAddressUpdateRequestDTO();
        request.setReceiver("New Receiver");
        request.setPhoneNumber("+84123456789");
        request.setCityName("New City");
        request.setWardName("New Ward");
        request.setDeliveryAddress("New Addr");
        request.setHide(true);

        UserAddressResponseDTO updatedDTO = new UserAddressResponseDTO();
        updatedDTO.setId(addressId);
        updatedDTO.setReceiver(request.getReceiver());
        updatedDTO.setPhoneNumber(request.getPhoneNumber());
        updatedDTO.setCityName(request.getCityName());
        updatedDTO.setWardName(request.getWardName());
        updatedDTO.setDeliveryAddress(request.getDeliveryAddress());
        updatedDTO.setHide(true);

        when(addressRepository.findByIdAndUserId(addressId, userId)).thenReturn(Optional.of(address));
        doAnswer(invocation -> {
            Address target = invocation.getArgument(0);
            UserAddressUpdateRequestDTO dto = invocation.getArgument(1);
            target.setReceiver(dto.getReceiver());
            target.setPhoneNumber(dto.getPhoneNumber());
            target.setCityName(dto.getCityName());
            target.setWardName(dto.getWardName());
            target.setDeliveryAddress(dto.getDeliveryAddress());
            target.setHide(dto.isHide());
            return null;
        }).when(userAddressMapper).updateAddress(eq(address), eq(request));
        when(userAddressMapper.toResponseDTO(address)).thenReturn(updatedDTO);

        UserAddressResponseDTO result = userAddressService.updateUserAddress(userId, addressId, request);

        assertThat(result).isEqualTo(updatedDTO);
        assertThat(address.isHide()).isTrue();
        verify(addressRepository).findByIdAndUserId(addressId, userId);
        verify(userAddressMapper).updateAddress(address, request);
        verify(userAddressMapper).toResponseDTO(address);
        verify(addressRepository, never()).save(any(Address.class));
    }

    @Test
    @DisplayName("updateUserAddress: should throw NotFoundException when address not found")
    void updateUserAddress_AddressNotFound_ThrowsNotFound() {
        int userId = 3;
        int addressId = 99;
        UserAddressUpdateRequestDTO request = new UserAddressUpdateRequestDTO();

        when(addressRepository.findByIdAndUserId(addressId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAddressService.updateUserAddress(userId, addressId, request))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Address not found");

        verify(addressRepository).findByIdAndUserId(addressId, userId);
        verifyNoInteractions(userAddressMapper);
    }

    @Test
    @DisplayName("createUserAddress: should throw IllegalArgumentException when address validation fails")
    void createUserAddress_InvalidAddress_ThrowsIllegalArgumentException() {
        int userId = 5;
        UserAddressCreateRequestDTO request = new UserAddressCreateRequestDTO();
        request.setCityName("Invalid City");
        request.setWardName("Invalid Ward");

        doThrow(new IllegalArgumentException("Invalid city name: Invalid City"))
                .when(addressValidator).validate(request.getCityName(), request.getWardName());

        assertThatThrownBy(() -> userAddressService.createUserAddress(userId, request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid city name: Invalid City");

        verify(addressValidator).validate(request.getCityName(), request.getWardName());
        verifyNoInteractions(userRepository, addressRepository, userAddressMapper);
    }

    @Test
    @DisplayName("updateUserAddress: should throw IllegalArgumentException when address validation fails")
    void updateUserAddress_InvalidAddress_ThrowsIllegalArgumentException() {
        int userId = 3;
        int addressId = 7;
        UserAddressUpdateRequestDTO request = new UserAddressUpdateRequestDTO();
        request.setCityName("Invalid City");
        request.setWardName("Invalid Ward");

        doThrow(new IllegalArgumentException("Invalid city name: Invalid City"))
                .when(addressValidator).validate(request.getCityName(), request.getWardName());

        assertThatThrownBy(() -> userAddressService.updateUserAddress(userId, addressId, request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid city name: Invalid City");

        verify(addressValidator).validate(request.getCityName(), request.getWardName());
        verifyNoInteractions(addressRepository, userAddressMapper);
    }

    @Test
    @DisplayName("softDelete: should set hide=true when address belongs to user")
    void softDelete_AddressBelongsToUser_SetsHide() {
        int userId = 1;
        int addressId = 2;
        Address address = createAddress(addressId, userId);

        when(addressRepository.findByIdAndUserId(addressId, userId)).thenReturn(Optional.of(address));

        userAddressService.softDelete(userId, addressId);

        assertThat(address.isHide()).isTrue();
        verify(addressRepository).findByIdAndUserId(addressId, userId);
        verify(addressRepository, never()).save(any(Address.class));
    }

    @Test
    @DisplayName("softDelete: should throw NotFoundException when address not found")
    void softDelete_AddressNotFound_ThrowsNotFound() {
        int userId = 1;
        int addressId = 404;

        when(addressRepository.findByIdAndUserId(addressId, userId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userAddressService.softDelete(userId, addressId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Address not found");

        verify(addressRepository).findByIdAndUserId(addressId, userId);
    }
}

