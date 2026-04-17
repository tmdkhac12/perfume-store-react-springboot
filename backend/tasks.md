# Tasks: Unit tests for `modules/auth`

Mục tiêu: Viết unit tests cho module `modules/auth` theo quy ước của dự án (JUnit5 + Mockito + AssertJ). Dùng checklist để tick khi hoàn thành mỗi bước.

## High-level checklist

- [ ] 1. Identify target classes to test
  - [ ] `AuthService` -> `AuthServiceTest`
  - [ ] `JwtService` -> `JwtServiceTest`
  - [ ] `CustomUserDetailsService` -> `CustomUserDetailsServiceTest`
  - [ ] `CustomOAuth2Service` -> `CustomOAuth2ServiceTest`
  - [ ] `CustomOAuth2SuccessHandler` -> `CustomOAuth2SuccessHandlerTest`
  - [ ] `JwtAuthenticationFilter` -> `JwtAuthenticationFilterTest`
  - [ ] `AuthMapper` (if present) -> `AuthMapperTest`

- [ ] 2. Create skeleton test files (place under `src/test/java/com/example/perfume_store/modules/auth/...`)
  - [ ] Use `@ExtendWith(MockitoExtension.class)`
  - [ ] Declare `@Mock` and `@InjectMocks` as appropriate
  - [ ] Add private helper factory methods for entities/DTOs

- [ ] 3. Implement concrete test cases per class
  - AuthService tests:
    - [ ] registerUser_success
    - [ ] registerUser_passwordMismatch -> expect `IllegalArgumentException`
    - [ ] registerUser_duplicateUser -> simulate repo exception / expect behavior
  - JwtService tests:
    - [ ] generateToken_returnsToken (use a test Base64URL secret or mock JwtService in dependent tests)
    - [ ] isTokenValid / extractAllClaims behavior (optional, crypto-heavy)
  - CustomUserDetailsService tests:
    - [ ] loadUserByUsername_found
    - [ ] loadUserByUsername_notFound -> expect `UsernameNotFoundException`
  - CustomOAuth2Service tests:
    - [ ] processOAuth2User_existingGoogleId_updatesEmailIfChanged
    - [ ] processOAuth2User_newGoogleId_createsUser
  - CustomOAuth2SuccessHandler tests:
    - [ ] onAuthenticationSuccess_createsJwtCookieAndRedirects
  - JwtAuthenticationFilter tests:
    - [ ] doFilterInternal_validToken_setsSecurityContext
    - [ ] doFilterInternal_invalidToken_writesUnauthorizedResponse

- [ ] 4. Follow project testing patterns
  - [ ] Use AssertJ (`assertThat`, `assertThatThrownBy`) and `@DisplayName`
  - [ ] Do NOT touch real DB / Cloudinary / filesystem — mock external dependencies
  - [ ] Instantiate MapStruct impl directly in mapper tests (e.g., `new BrandMapperImpl()` pattern)
  - [ ] Avoid `@SpringBootTest` for unit tests; use only for integration/context smoke tests

- [ ] 5. Run tests and iterate
  - [ ] Run `mvn clean test` locally and fix failing tests
  - [ ] Ensure tests are deterministic and isolated

## Quick commands

Chạy toàn bộ unit tests:
```powershell
mvn clean test
```

---

Ghi chú: Khi hoàn thành mỗi bước, đánh dấu [x] tương ứng trong file này để cập nhật tiến độ.

