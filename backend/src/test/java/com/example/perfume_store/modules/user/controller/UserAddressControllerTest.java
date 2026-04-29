package com.example.perfume_store.modules.user.controller;

import com.example.perfume_store.configs.security.SecurityContextGetter;
import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import com.example.perfume_store.modules.user.dtos.response.UserAddressResponseDTO;
import com.example.perfume_store.modules.user.service.UserAddressService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserAddressControllerTest {

    @Mock
    private UserAddressService userAddressService;

    @Mock
    private SecurityContextGetter securityContextGetter;

    @Mock
    private HttpServletRequest httpServletRequest;

    @InjectMocks
    private UserAddressController userAddressController;

    @Test
    @DisplayName("getAllAddresses: should get user id from SecurityContextGetter and call service")
    void getAllAddresses_CallsServiceWithUserId() {
        int userId = 1;
        List<UserAddressResponseDTO> addresses = List.of();

        when(securityContextGetter.getUserId()).thenReturn(userId);
        when(userAddressService.getAllUserAddresses(userId)).thenReturn(addresses);

        ResponseEntity<?> result = userAddressController.getAllAddresses(httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(securityContextGetter).getUserId();
        verify(userAddressService).getAllUserAddresses(userId);
    }

    @Test
    @DisplayName("createAddress: should get user id from SecurityContextGetter and call service with DTO")
    void createAddress_CallsServiceWithDTOAndUserId() {
        int userId = 2;
        UserAddressCreateRequestDTO request = new UserAddressCreateRequestDTO();
        UserAddressResponseDTO response = new UserAddressResponseDTO();

        when(securityContextGetter.getUserId()).thenReturn(userId);
        when(userAddressService.createUserAddress(userId, request)).thenReturn(response);

        ResponseEntity<?> result = userAddressController.createAddress(request, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        verify(securityContextGetter).getUserId();
        verify(userAddressService).createUserAddress(userId, request);
    }

    @Test
    @DisplayName("updateAddress: should get user id from SecurityContextGetter and call service")
    void updateAddress_CallsServiceWithIdAndDTO() {
        int userId = 3;
        int addressId = 10;
        UserAddressUpdateRequestDTO request = new UserAddressUpdateRequestDTO();
        UserAddressResponseDTO response = new UserAddressResponseDTO();

        when(securityContextGetter.getUserId()).thenReturn(userId);
        when(userAddressService.updateUserAddress(userId, addressId, request)).thenReturn(response);

        ResponseEntity<?> result = userAddressController.updateAddress(addressId, request, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(securityContextGetter).getUserId();
        verify(userAddressService).updateUserAddress(userId, addressId, request);
    }

    @Test
    @DisplayName("softDeleteAddress: should get user id from SecurityContextGetter and call service")
    void softDeleteAddress_CallsServiceWithUserIdAndAddressId() {
        int userId = 4;
        int addressId = 20;

        when(securityContextGetter.getUserId()).thenReturn(userId);

        ResponseEntity<?> result = userAddressController.softDeleteAddress(addressId, httpServletRequest);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(securityContextGetter).getUserId();
        verify(userAddressService).softDelete(userId, addressId);
    }
}

