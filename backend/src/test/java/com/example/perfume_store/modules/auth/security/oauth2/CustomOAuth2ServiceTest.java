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
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Collections;

@ExtendWith(MockitoExtension.class)
class CustomOAuth2ServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomOAuth2Service customOAuth2Service;

    @Test
    @DisplayName("processOAuth2User: existing google id updates or returns user")
    void processOAuth2User_existingGoogleId_updatesEmailIfChanged() throws Exception {
        // Arrange
        String googleId = "g123";
        User existing = createUser(googleId, "old@b.com");
        when(userRepository.findByGoogleId(googleId)).thenReturn(Optional.of(existing));

        DefaultOAuth2User oauth2User = createOAuth2User(googleId, "new@b.com", "New Name");

        // Act
        invokeProcessOAuth2User(oauth2User);

        // Assert
        verify(userRepository).save(existing);
    }

    @Test
    @DisplayName("processOAuth2User: new google id creates user")
    void processOAuth2User_newGoogleId_createsUser() throws Exception {
        // Arrange
        String googleId = "g999";
        when(userRepository.findByGoogleId(googleId)).thenReturn(Optional.empty());

        DefaultOAuth2User oauth2User = createOAuth2User(googleId, "fresh@b.com", "Fresh User");
        when(userRepository.save(org.mockito.ArgumentMatchers.any(User.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        // Act
        invokeProcessOAuth2User(oauth2User);

        // Assert
        verify(userRepository).save(org.mockito.ArgumentMatchers.any(User.class));
    }

    // Factory helper methods
    private User createUser(String googleId, String email) {
        User user = new User();
        user.setGoogleId(googleId);
        user.setEmail(email);
        return user;
    }

    private DefaultOAuth2User createOAuth2User(String googleId, String email, String name) {
        Map<String, Object> attributes = new java.util.HashMap<>();
        attributes.put("sub", googleId);
        attributes.put("email", email);
        attributes.put("name", name);
        return new DefaultOAuth2User(java.util.Collections.emptyList(), attributes, "sub");
    }

    private void invokeProcessOAuth2User(org.springframework.security.oauth2.core.user.OAuth2User oauth2User) throws Exception {
        java.lang.reflect.Method m = CustomOAuth2Service.class.getDeclaredMethod("processOAuth2User", 
                org.springframework.security.oauth2.core.user.OAuth2User.class);
        m.setAccessible(true);
        m.invoke(customOAuth2Service, oauth2User);
    }
}


