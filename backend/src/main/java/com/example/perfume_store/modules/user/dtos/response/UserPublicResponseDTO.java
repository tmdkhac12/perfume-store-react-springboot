package com.example.perfume_store.modules.user.dtos.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserPublicResponseDTO {

    private int id;

    private String name, username, email;

}
