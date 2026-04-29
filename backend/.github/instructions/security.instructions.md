---
applyTo: "modules/auth/**"
---
# Bảo mật & Định danh
- Quy tắc bảo mật nằm trong `configs/security/SecurityConfig.java`; quyền truy cập endpoint ưu tiên theo path trước, sau đó đến mức method (`@PreAuthorize`) khi cần.
- JWT bearer token được parse trong `modules/auth/security/jwt/JwtAuthenticationFilter.java`; authenticated principal sau đó được đọc qua `configs/security/SecurityContextGetter.java`.
- OAuth2 login được bật cho Google (`application.yaml` + `CustomOAuth2Service`), sau đó `CustomOAuth2SuccessHandler` phát hành JWT cookie và redirect tới `/api/v1/auth/home`.
- Module auth sở hữu các endpoint định danh (`/api/v1/auth/**`), còn các module nghiệp vụ sở hữu hành vi tài nguyên (`notes/architecture.txt`).
