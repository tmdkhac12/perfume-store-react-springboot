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

import java.util.Optional;

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
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (email == null || email.isEmpty()) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }

        // Find the email in database
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            // Create a new user if email doesn't exist
            User user = new User();
            user.setEmail(email);
            user.setName(name);

            // Or logic create custom username
            user.setUsername(email);

            user.setActive(true);
            user.setSuperuser(false);

            // With OAuth2, normally password is null or a random value
            user.setHashedPassword(null);
            userRepository.save(user);
        }

        return oAuth2User;
    }
}
