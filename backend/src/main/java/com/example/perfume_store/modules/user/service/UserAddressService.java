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
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserAddressService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final UserAddressMapper userAddressMapper;
    private final AddressValidator addressValidator;

    private User getUserByIdEntity(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    private Address getAddressByIdEntity(int addressId) {
        return addressRepository.findById(addressId)
                .orElseThrow(() -> new NotFoundException("Address not found"));
    }

    private Address getAddressByIdEntity(int userId, int addressId) {
        return addressRepository.findByIdAndUserIdAndHideFalse(addressId, userId)
                .orElseThrow(() -> new NotFoundException("Address not found"));
    }

    public List<UserAddressResponseDTO> getAllUserAddresses(int userId) {
        List<Address> addresses = addressRepository.findByUserIdAndHideFalse(userId);
        return userAddressMapper.toResponseDTO(addresses);
    }

    @Transactional
    public UserAddressResponseDTO createUserAddress(int userId, UserAddressCreateRequestDTO addressCreateRequestDTO) {
        addressValidator.validate(addressCreateRequestDTO.getCityName(), addressCreateRequestDTO.getWardName());

        User user = getUserByIdEntity(userId);
        Address address = userAddressMapper.toEntity(addressCreateRequestDTO);
        address.setUser(user);
        return userAddressMapper.toResponseDTO(addressRepository.save(address));
    }

    @Transactional
    public UserAddressResponseDTO updateUserAddress(int currentUserId, int addressId, UserAddressUpdateRequestDTO userAddressUpdateRequestDTO) {
        addressValidator.validate(userAddressUpdateRequestDTO.getCityName(), userAddressUpdateRequestDTO.getWardName());

        // Hibernate will commit automatically
        Address address = getAddressByIdEntity(currentUserId, addressId);
        userAddressMapper.updateAddress(address, userAddressUpdateRequestDTO);
        return userAddressMapper.toResponseDTO(address);
    }

    @Transactional
    public void softDelete(int currentUserId, int addressId) {
        Address address = getAddressByIdEntity(currentUserId, addressId);
        address.setHide(true);
    }
}
