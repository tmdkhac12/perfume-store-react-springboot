# MIGRATED
This file's content has been migrated and split into smaller GitHub Copilot instructions under `.github/copilot-instructions/`.
Please refer to the smaller files in that directory for repository specific directions.

# Implemented Features (Codebase scan - 2026-04-17)

Below is a concise inventory of implemented features discovered by scanning the codebase. Each item lists the module, main endpoints (controller), and key service behaviors implemented in the repository.

- Auth
    - Controllers: `/api/v1/auth` (`AuthController`)
        - POST `/login` — authenticate username/password and return JWT token
        - POST `/register` — register new user (password + confirm check)
        - GET `/home` — OAuth2 success redirect target (mock)
        - POST `/token` — validate token from Authorization header
    - Services: `AuthService`, `JwtService`, `CustomUserDetailsService`
        - Password hashing on registration (`PasswordEncoder`)
        - JWT generation and validation (`JwtService`)
        - OAuth2 support: `CustomOAuth2Service` + `CustomOAuth2SuccessHandler` issues JWT cookie

- Brand
    - Controllers: `/api/v1/brands` (`BrandController`)
        - GET all, GET by id, POST create, PUT update, DELETE hard delete
    - Services: `BrandService`
        - CRUD brand with NotFound checks and guard against deleting referenced brands

- Note
    - Controllers: `/api/v1/notes` (`NoteController`)
        - GET all, GET by id, POST create, PUT update, DELETE
    - Services: `NoteService`
        - CRUD note with NotFound checks and guard against deleting notes used by perfumes

- Volume
    - Controllers: `/api/v1/volumes` (`VolumeController`)
        - GET all, GET by id, POST create, PUT update, DELETE
    - Services: `VolumeService`
        - CRUD volume with NotFound checks and guard against deleting volumes used by perfumes

- Perfume (Catalog)
    - Controllers: `/api/v1/perfumes` (`PerfumeController`)
        - GET paginated/filter (name, gender, price range, orderBy)
        - GET by id
        - POST create (multipart/form-data, upload sample images)
        - PUT update (multipart/form-data, update volumes/notes/images)
        - DELETE perfume (deletes remote images)
    - Services: `PerfumeService`
        - Full create/update/delete flows transactional
        - Persists Perfume, VolumePerfume, NotePerfume, SampleImage
        - Uses `PerfumeSpecification` for filtering and `PageResponse` mapping
        - Cloudinary integration for uploading and deleting images (`CloudinaryService`)

- Invoice
    - Controllers: `/api/v1/invoices` (`InvoiceController`)
        - GET paginated invoices with filters (search, date, total, delivery/payment status)
        - GET invoice details by id
        - POST create invoice (uses authenticated user id from `SecurityContextGetter`)
        - PATCH update status (admin), PATCH cancel (user)
    - Services: `InvoiceService`
        - Create invoice with invoice details, total calculation, persisting Invoice and InvoiceDetails
        - Paginated listing using `InvoiceSpecification`
        - Business rules: cancel/update constraints, NotFound checks

- User
    - Admin endpoints: `/api/v1/admin/users` (`UserAdminController`)
        - GET paginated users, GET user by id, POST create user (default password), POST reset-password, PUT update
        - Service: `UserAdminService` (password hashing, CRUD, pagination)
    - Self endpoints: `/api/v1/users/me` (`UserSelfController`)
        - GET current user's profile (via `SecurityContextGetter` and `UserSelfService`)
    - Addresses: `/api/v1/users/me/addresses` (`UserAddressController`)
        - GET all, POST create, PUT update, PATCH soft-delete
        - Service: `UserAddressService` (user/address validation, soft-delete)

- Security & Platform
    - `SecurityConfig` sets path-based access rules, OAuth2 login, JWT filter insertion, and password encoder
    - `JwtAuthenticationFilter` parses Bearer token, validates and sets Spring Security context
    - `SecurityContextGetter` reads authenticated user id from security context

- Common / Infra
    - Response envelope: `ApiResponseFactory` used by controllers
    - Global exception handling: `GlobalExceptionsHandler` (maps exceptions to ApiResponse)
    - Cloudinary config/service for image upload/delete (`CloudinaryConfig`, `CloudinaryService`)
    - JPA Specifications for filtering: `PerfumeSpecification`, `InvoiceSpecification`

Notes / Known gaps (observed from code scan)
- Unit tests exist for services and mappers (see `src/test/...`) but not every service has exhaustive coverage.
- Some components expect environment variables (JWT secret, Cloudinary, MySQL) configured in `application.yaml`.
- The OAuth2 flow creates or syncs users by Google id; frontend behavior and full token cookie setup depends on runtime envs.

This inventory is derived from controller and service implementations present in the repository as of 2026-04-17.

