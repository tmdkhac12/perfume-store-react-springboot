package com.example.perfume_store.configs.security;

import com.example.perfume_store.modules.auth.security.user.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
public class SecurityContextGetter {

    public int getUserId() {
        Authentication authentication = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication());
        CustomUserDetails userDetails = (CustomUserDetails) Objects.requireNonNull(authentication.getPrincipal());
        return userDetails.getId();

    }
}
