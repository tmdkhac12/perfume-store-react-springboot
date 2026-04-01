package com.example.perfume_store.modules.auth.security.user;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    /**
     * This function does only one thing which is load the user from the database
     * by username and convert it to UserDetails for Spring Security
     * <p>
     * This is the unique port to get a user's information, if you add any methods
     * to loadUserByUsername you have to override various Spring filters
     */
    @Override
    @NonNull
    public UserDetails loadUserByUsername(@Nullable String identifier) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

        return new CustomUserDetails(user);
    }
}
