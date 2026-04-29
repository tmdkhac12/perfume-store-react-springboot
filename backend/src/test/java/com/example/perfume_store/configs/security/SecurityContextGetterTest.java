package com.example.perfume_store.configs.security;

import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.modules.auth.security.user.CustomUserDetails;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SecurityContextGetterTest {

    @InjectMocks
    private SecurityContextGetter securityContextGetter;

    @Test
    @DisplayName("getUserId: should return user id from CustomUserDetails in security context")
    void getUserId_ReturnsIdFromContext() {
        int expectedUserId = 42;
        User user = new User();
        user.setId(expectedUserId);
        CustomUserDetails userDetails = new CustomUserDetails(user);

        Authentication auth = mock(Authentication.class);
        SecurityContext context = mock(SecurityContext.class);

        when(context.getAuthentication()).thenReturn(auth);
        when(auth.getPrincipal()).thenReturn(userDetails);

        try (MockedStatic<SecurityContextHolder> holder = mockStatic(SecurityContextHolder.class)) {
            holder.when(SecurityContextHolder::getContext).thenReturn(context);

            int result = securityContextGetter.getUserId();

            assertThat(result).isEqualTo(expectedUserId);
        }
    }

    @Test
    @DisplayName("getUserId: should throw NullPointerException when authentication is null")
    void getUserId_AuthenticationNull_ThrowsException() {
        SecurityContext context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(null);

        try (MockedStatic<SecurityContextHolder> holder = mockStatic(SecurityContextHolder.class)) {
            holder.when(SecurityContextHolder::getContext).thenReturn(context);

            assertThatThrownBy(() -> securityContextGetter.getUserId())
                    .isInstanceOf(NullPointerException.class);
        }
    }

    @Test
    @DisplayName("getUserId: should throw NullPointerException when principal is null")
    void getUserId_PrincipalNull_ThrowsException() {
        Authentication auth = mock(Authentication.class);
        SecurityContext context = mock(SecurityContext.class);

        when(context.getAuthentication()).thenReturn(auth);
        when(auth.getPrincipal()).thenReturn(null);

        try (MockedStatic<SecurityContextHolder> holder = mockStatic(SecurityContextHolder.class)) {
            holder.when(SecurityContextHolder::getContext).thenReturn(context);

            assertThatThrownBy(() -> securityContextGetter.getUserId())
                    .isInstanceOf(NullPointerException.class);
        }
    }
}


