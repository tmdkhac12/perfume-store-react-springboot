# Công việc: Unit test cho `modules/auth`

Mục tiêu: Viết unit tests cho module `modules/auth` theo quy ước của dự án (JUnit5 + Mockito + AssertJ). Dùng checklist để tick khi hoàn thành mỗi bước.

## Checklist cấp cao

- [x] 1. Xác định các class mục tiêu cần test
  - [x] `AuthService` -> `AuthServiceTest`
  - [x] `JwtService` -> `JwtServiceTest`
  - [x] `CustomUserDetailsService` -> `CustomUserDetailsServiceTest`
  - [x] `CustomOAuth2Service` -> `CustomOAuth2ServiceTest`
  - [x] `CustomOAuth2SuccessHandler` -> `CustomOAuth2SuccessHandlerTest`
  - [x] `JwtAuthenticationFilter` -> `JwtAuthenticationFilterTest`
  - [x] `AuthMapper` (if present) -> `AuthMapperTest`

- [x] 2. Tạo các file test skeleton (đặt dưới `src/test/java/com/example/perfume_store/modules/auth/...`)
  - [x] Dùng `@ExtendWith(MockitoExtension.class)`
  - [x] Khai báo `@Mock` và `@InjectMocks` phù hợp
  - [x] Thêm private helper factory method cho entity/DTO

- [ ] 3. Triển khai test case cụ thể cho từng class
  - Test `AuthService`:
    - [x] registerUser_success
    - [x] registerUser_passwordMismatch -> kỳ vọng `IllegalArgumentException`
    - [x] registerUser_duplicateUser -> giả lập repo exception / kỳ vọng hành vi
  - Test `JwtService`:
    - Test `JwtService`:
    - [x] generateToken_returnsToken (dùng test secret Base64URL hoặc mock JwtService trong các test phụ thuộc)
    - [x] isTokenValid / hành vi extractAllClaims (tùy chọn, thiên về crypto)
  - Test `CustomUserDetailsService`:
    - [x] loadUserByUsername_found
    - [x] loadUserByUsername_notFound -> kỳ vọng `UsernameNotFoundException`
  - Test `CustomOAuth2Service`:
    - [x] processOAuth2User_existingGoogleId_updatesEmailIfChanged
    - [x] processOAuth2User_newGoogleId_createsUser
  - Test `CustomOAuth2SuccessHandler`:
    - [x] onAuthenticationSuccess_createsJwtCookieAndRedirects
  - Test `JwtAuthenticationFilter`:
    - [x] doFilterInternal_validToken_setsSecurityContext
    - [x] doFilterInternal_invalidToken_writesUnauthorizedResponse

- [x] 4. Tuân theo testing pattern của dự án
  - [x] Dùng AssertJ (`assertThat`, `assertThatThrownBy`) và `@DisplayName`
  - [x] Cấu trúc test & helper:
    - Ưu tiên private factory/helper method nhỏ để tạo test entity/DTO (xem `BrandServiceTest#createBrand(...)`). Giữ helper ở mức private và tập trung theo từng class test.
    - Tránh shared mutable fixture lớn; mỗi test chỉ setup phần nó cần.
    - Đặt tên test: ưu tiên `subject_scenario_expected` (ví dụ: `registerUser_withPasswordMismatch_throwsIllegalArgumentException`) hoặc dùng `@DisplayName("registerUser — password mismatch -> IllegalArgumentException")`.
  - [x] Test exception:
    - Assert exception được throw và message của nó. Ưu tiên pattern:
      - `assertThatThrownBy(() -> subject(...)).isInstanceOf(NotFoundException.class).hasMessage("...");`
    - Kiểm tra cả type exception và message cho các business error quan trọng (ví dụ: `NotFoundException`, `IllegalStateException`).
  - [x] Hệ thống bên ngoài & mapper:
    - KHÔNG chạm DB / Cloudinary / filesystem thật — mock external dependency.
    - Khởi tạo trực tiếp MapStruct impl trong mapper test (ví dụ: `new AuthMapperImpl()`).
  - [x] Phạm vi test:
    - Tránh `@SpringBootTest` cho unit test; chỉ dùng cho integration/context smoke test.
  - [x] Ghi chú hoàn thành:
    - Toàn bộ unit test của auth-module đã tuân theo các quy ước này. Review hoàn thành.

- [ ] 5. Chạy test và lặp cải tiến
  - [ ] Chạy `mvn clean test` trên máy local và sửa các test đang fail
  - [ ] Đảm bảo test có tính deterministic và được cô lập

## Lệnh nhanh

Chạy toàn bộ unit tests:
```powershell
mvn clean test
```

---

Ghi chú: Khi hoàn thành mỗi bước, đánh dấu [x] tương ứng trong file này để cập nhật tiến độ.

