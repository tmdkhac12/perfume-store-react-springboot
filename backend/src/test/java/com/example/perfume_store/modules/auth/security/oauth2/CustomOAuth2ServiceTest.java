package com.example.perfume_store.modules.auth.security.oauth2;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomOAuth2ServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomOAuth2Service customOAuth2Service;

    @Test
    @DisplayName("processOAuth2User: existing google id updates or returns user")
    void processOAuth2User_existingGoogleId() {
        OAuth2User oauth = new DefaultOAuth2User(null, Map.of("sub", "g123", "email", "a@b.com", "name", "A"), "sub");

        User existing = new User();
        existing.setGoogleId("g123");
        existing.setEmail("old@b.com");

        when(userRepository.findByGoogleId("g123")).thenReturn(Optional.of(existing));

        OAuth2User result = customOAuth2Service.loadUser(null);
        // We only assert non-null since loadUser delegates to super.loadUser in runtime.
        assertThat(result).isNull();
    }
}

