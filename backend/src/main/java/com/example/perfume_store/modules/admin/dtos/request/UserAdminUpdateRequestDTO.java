package com.example.perfume_store.modules.admin.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserAdminUpdateRequestDTO {

    @NotBlank(message = "Name must not be blank")
    @Size(min = 1, max = 255, message = "Name must between 1 and 255 characters")
    private String name;

    @Email(message = "Email is invalid")
    private String email;

    private boolean superuser;

    private boolean active;

}
