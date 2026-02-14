package com.example.perfume_store.modules.user.dtos.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
public class UserAddressCreateRequestDTO {
    @NotBlank(message = "Receiver name must not be blank")
    @Size(max = 100, message = "Receiver name must not exceed 100 characters")
    private String receiver;

    @NotBlank(message = "Phone number must not be blank")
    @Pattern(
            regexp = "^(0|\\+84)[0-9]{9,10}$",
            message = "Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"
    )
    private String phoneNumber;

    @NotBlank(message = "City name must not be blank")
    @Size(max = 255, message = "City name must not exceed 255 characters")
    private String cityName;

    @NotBlank(message = "Ward name must not be blank")
    @Size(max = 255, message = "Ward name must not exceed 255 characters")
    private String wardName;

    @NotBlank(message = "Delivery address must not be blank")
    @Size(max = 255, message = "Delivery address must not exceed 255 characters")
    private String deliveryAddress;
}
