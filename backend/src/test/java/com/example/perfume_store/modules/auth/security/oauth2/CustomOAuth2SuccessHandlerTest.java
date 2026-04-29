package com.example.perfume_store.modules.auth.security.oauth2;

import com.example.perfume_store.modules.auth.security.jwt.JwtService;
import com.example.perfume_store.modules.auth.security.user.CustomUserDetailsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import jakarta.servlet.http.Cookie;
import org.springframework.security.web.RedirectStrategy;

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
        // --- Arrange ---
        // Mock RedirectStrategy để chặn đứng logic tính toán URL phức tạp của Spring
        RedirectStrategy redirectStrategy = mock(RedirectStrategy.class);
        successHandler.setRedirectStrategy(redirectStrategy);

        when(authentication.getPrincipal()).thenReturn(oauth2User);
        when(oauth2User.getAttribute("email")).thenReturn("a@b.com");

        UserDetails mockUserDetails = mock(UserDetails.class);
        when(userDetailsService.loadUserByUsername("a@b.com")).thenReturn(mockUserDetails);
        when(jwtService.generateToken(mockUserDetails)).thenReturn("mock-token");

        // --- Act ---
        successHandler.onAuthenticationSuccess(request, response, authentication);

        // --- Assert ---

        // 1. Kiểm tra Cookie (Sử dụng ArgumentCaptor như cũ vì phần này hoạt động tốt)
        ArgumentCaptor<Cookie> cookieCaptor = ArgumentCaptor.forClass(Cookie.class);
        verify(response).addCookie(cookieCaptor.capture());
        Cookie capturedCookie = cookieCaptor.getValue();

        assertThat(capturedCookie.getName()).isEqualTo("jwt_token");
        assertThat(capturedCookie.getValue()).isEqualTo("mock-token");
        assertThat(capturedCookie.isHttpOnly()).isTrue();

        // 2. Kiểm tra Redirect thông qua RedirectStrategy (Đây là điểm mấu chốt)
        // verify lên redirectStrategy thay vì response
        verify(redirectStrategy).sendRedirect(request, response, "/api/v1/auth/home");

        // Đảm bảo không có lệnh sendRedirect trực tiếp nào khác gọi vào response làm nhiễu test
        verify(response, never()).sendRedirect(anyString());
    }
}
