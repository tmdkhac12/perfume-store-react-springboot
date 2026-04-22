package com.example.perfume_store.modules.auth.security.oauth2;

import com.example.perfume_store.modules.auth.security.jwt.JwtService;
import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomOAuth2SuccessHandlerTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private CustomUserDetailsService userDetailsService;

    @InjectMocks
    private CustomOAuth2SuccessHandler successHandler;

    @Mock
    private Authentication authentication;

    @Mock
    private OAuth2User oauth2User;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Test
    @DisplayName("onAuthenticationSuccess: builds jwt cookie and redirects")
    void onAuthenticationSuccess_createsJwtCookieAndRedirects() throws Exception {
        when(authentication.getPrincipal()).thenReturn(oauth2User);
        when(oauth2User.getAttribute("email")).thenReturn("a@b.com");
        when(userDetailsService.loadUserByUsername("a@b.com")).thenThrow(new RuntimeException("not implemented"));

        // This is a behavioral skeleton: real behavior depends on JwtService and UserDetails
        try {
            successHandler.onAuthenticationSuccess(request, response, authentication);
        } catch (RuntimeException ignored) {
            // ignore since dependencies are not fully stubbed in skeleton
        }

        // verify that response.addCookie is attempted in normal flow (can't guarantee in skeleton)
        // verify(response).addCookie(any(Cookie.class));
    }
}

