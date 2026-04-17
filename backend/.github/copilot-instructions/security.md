# Security and Identity Flow
- Security rules live in `configs/security/SecurityConfig.java`; endpoint access is path-based first, then method-level (`@PreAuthorize`) where needed.
- JWT bearer token is parsed in `modules/auth/security/jwt/JwtAuthenticationFilter.java`; authenticated principal is later read via `configs/security/SecurityContextGetter.java`.
- OAuth2 login is enabled for Google (`application.yaml` + `CustomOAuth2Service`), then `CustomOAuth2SuccessHandler` issues JWT cookie and redirects to `/api/v1/auth/home`.
- Auth module owns identity endpoints (`/api/v1/auth/**`), while business modules own resource behavior (`notes/architecture.txt`).

