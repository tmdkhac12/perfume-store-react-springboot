package com.example.perfume_store.modules.user.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserAdminResponseDTO {

    private int id;

    private String name, username, email;

    private boolean superuser, active;
}
