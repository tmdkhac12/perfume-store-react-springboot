package com.example.perfume_store.modules.auth;

import com.example.perfume_store.domain.user.User;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

    private final User user;

    public int getId() {
        return user.getId();
    }

    private String getRole(boolean isSuperuser) {
        return isSuperuser ? "ROLE_ADMIN" : "ROLE_USER";
    }

    /**
     * Base on this user to grant permission, if the user is an admin,
     * give him "ROLE_ADMIN" to @PreAuthorize
     */
    @Override
    @NonNull
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority(getRole(user.isSuperuser()))
        );
    }

    @Override
    public @Nullable String getPassword() {
        return user.getHashedPassword();
    }

    @Override
    @NonNull
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isEnabled() {
        return user.isActive();
    }
}
