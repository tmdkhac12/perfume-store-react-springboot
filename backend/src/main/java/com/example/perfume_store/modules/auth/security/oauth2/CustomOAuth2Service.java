package com.example.perfume_store.modules.auth.security.oauth2;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomOAuth2Service extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    // After receiving the access token from Google, this method is run
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // Get personal information from Google account
        OAuth2User oAuth2User = super.loadUser(userRequest);
        return processOAuth2User(oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2User oAuth2User) {
        String googleId = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // 1. Google ID existed (Logged in by Google before)
        userRepository.findByGoogleId(googleId)
                .map(existingUser -> {
                    // If a user update their Google email, sync with database
                    if (!existingUser.getEmail().equals(email)) {
                        existingUser.setEmail(email);
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })

                // 2. If absolutely new, create a new account
                .orElseGet(() -> {
                    // Traditional username won't contain '@'
                    User newUser = new User();
                    newUser.setGoogleId(googleId);
                    newUser.setEmail(email);
                    newUser.setUsername(email);
                    newUser.setName(name);
                    newUser.setActive(true);
                    return userRepository.save(newUser);
                });

        return oAuth2User;
    }
}
