package com.example.perfume_store.modules.user.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserAddressResponseDTO {

    private int id;

    private String receiver;

    private String phoneNumber;

    private String cityName;

    private String wardName;

    private String deliveryAddress;

    private boolean hide;
}
