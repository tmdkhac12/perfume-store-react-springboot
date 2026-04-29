# Perfume Store Backend — Hướng dẫn toàn diện

**Cập nhật lần cuối:** 29/04/2026

## 📋 Mục lục
1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Tech Stack](#2-tech-stack)
3. [Quy tắc thiết kế](#3-quy-tắc-thiết-kế)
4. [Quy tắc bắt buộc](#4-quy-tắc-bắt-buộc-must--must-not)
5. [Workflow](#5-workflow)
6. [Các tính năng đã triển khai](#6-các-tính-năng-đã-triển-khai)
7. [Cập nhật phiên làm việc](#7-cập-nhật-phiên-làm-việc)

---

# 1. TỔNG QUAN DỰ ÁN

## Mô tả chung
**Perfume Store Backend** là hệ thống phụ trợ RESTful API cho ứng dụng quản lý cửa hàng nước hoa trực tuyến. Dự án này hỗ trợ các chức năng ư tiên:
- Quản lý catalog nước hoa (thương hiệu, mùi, âm lượng, giá cả)
- Xác thực và phân quyền người dùng (JWT + OAuth2)
- Quản lý đơn hàng và thanh toán
- Quản lý địa chỉ giao hàng
- Tích hợp lưu trữ ảnh từ xa (Cloudinary)

**Đối tượng:** Cửa hàng nước hoa, khách hàng, người quản lý kho

**Mục tiêu:** Cung cấp API ổn định, có thể mở rộng để hỗ trợ frontend web/mobile, đảm bảo bảo mật dữ liệu người dùng và tuân thủ các quy tắc thiết kế code chất lượng cao.

---

# 2. TECH STACK

## Backend
- **Framework:** Spring Boot 4.0.0 (Java 21)
- **Build Tool:** Maven 4.0.0

## Database
- **Database:** MySQL 8.0+
- **ORM:** JPA + Hibernate (Spring Data JPA)
- **Migration:** DDL auto: none (quản lý schema bằng SQL script)

## Security & Auth
- **Spring Security:** `spring-boot-starter-security`
- **JWT:** JJWT 0.12.6 (io.jsonwebtoken)
- **OAuth2:** `spring-boot-starter-oauth2-client` (Google SSO)

## API & Data Transformation
- **REST:** Spring Web (`spring-boot-starter-web`)
- **Mapping:** MapStruct 1.5.5 (code generation)
- **Validation:** `spring-boot-starter-validation` + Jakarta Bean Validation

## Code Quality & Productivity
- **Annotation Processing:** Lombok 1.18.40 (+ lombok-mapstruct-binding 0.2.0)
- **Devtools:** Spring Boot DevTools (live reload)

## File Storage
- **Cloud Storage:** Cloudinary HTTP44 1.36.0 (image upload/delete)

## Testing
- **Test Framework:** JUnit 5 + Mockito
- **Assertion Library:** AssertJ

---

# 3. QUY TẮC THIẾT KẾ

> **Lưu ý:** Backend không có UI, nhưng các quy tắc áp dụng cho API response và cấu trúc code.

## Nguyên tắc API Design
- **Naming Convention:** Tên endpoint dùng kebab-case (`/api/v1/perfumes`, `/api/v1/user-addresses`)
- **HTTP Method:** Tuân theo REST convention (GET, POST, PUT, PATCH, DELETE)
- **Response Format:** JSON, luôn bao trong `ApiResponse` envelope với status, error, data
- **Status Code:** 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

## Cấu trúc Code
- **Module Pattern:** Modular monolith với các module độc lập (auth, brand, perfume, invoice, user)
- **Layer:** Controller → Service → Mapper → DTO → Repository → Entity
- **File Organization:**
  - `src/main/java/com/example/perfume_store/modules/{module_name}/controller/`
  - `src/main/java/com/example/perfume_store/modules/{module_name}/service/`
  - `src/main/java/com/example/perfume_store/modules/{module_name}/mapper/`
  - `src/main/java/com/example/perfume_store/modules/{module_name}/dto/`
  - `src/main/java/com/example/perfume_store/domain/{entity_name}/`

## Kiểu dữ liệu & Format
- **Date/Time:** LocalDateTime (ISO 8601 format)
- **Currency:** BigDecimal (dùng cho giá cả, không dùng float)
- **ID:** Long (UUID có thể dùng nếu cần distributed)
- **Enums:** Lưu dưới dạng STRING trong database

## Coding Convention
- **Ngôn ngữ:** Source code toàn bộ bằng tiếng Anh (class, method, variable, comment)
- **Naming:** camelCase cho method/variable, PascalCase cho class
- **Null Safety:** Dùng Optional<T> thay vì null, @NonNull annotation
- **Immutability:** DTO nên immutable (dùng final field hoặc record)

---

# 4. QUY TẮC BẮT BUỘC (MUST & MUST NOT)

## PHẢI LÀM

- Bắt buộc đọc và tuân thủ [.github/copilot-instructions.md](.github/copilot-instructions.md) và bộ tài liệu hướng dẫn nguyên tắc bên trong [.github/instructions/**.md](`.github/instructions/**.md`)

✅ **Xác thực & Phân quyền**
- Mọi endpoint (trừ login/register) phải yêu cầu JWT hoặc OAuth2
- Dùng `@PreAuthorize` để kiểm tra role nếu cần (admin, user)
- Đọc user hiện tại qua `SecurityContextGetter`

✅ **Lỗi Exception Handling**
- Throw domain exception (`NotFoundException`, `IllegalStateException`, `BadCredentialsException`)
- Global exception handler sẽ map sang ApiResponse tự động
- Viết message lỗi rõ ràng, có ý nghĩa cho client

✅ **Database Transactions**
- Method thay đổi nhiều bảng phải có `@Transactional`
- Lỗi sẽ rollback tự động

✅ **Validation**
- Dùng `@Validated` + bean validation (`@NotNull`, `@Min`, `@Max`, `@Email`)
- Kiểm tra input trước khi xử lý logic

✅ **API Response**
- Luôn trả `ResponseEntity<ApiResponse<T>>` via `ApiResponseFactory`
- Format: `{ "status": 200, "message": "...", "data": {...}, "error": null }`

✅ **Logging**
- Dùng SLF4J với Lombok `@Slf4j`
- Log lỗi quan trọng (exception, invalid request, external service fail)

✅ **Unit Test**
- Mỗi service/mapper phải có unit test
- Dùng JUnit 5 + Mockito + AssertJ
- Mock dependency bên ngoài (repository, external service)

---

## KHÔNG ĐƯỢC LÀM

❌ **Không trả raw DTO hoặc raw Object**
- Sai: `return user;` ← Phải dùng ApiResponseFactory

❌ **Không chạm DB trực tiếp trong test**
- Sai: `@DataJpaTest` cho unit test ← Chỉ dùng mock

❌ **Không hỗn hợp tiếng Việt & tiếng Anh trong code**
- Sai: `Integer soLuong;` ← Phải `Integer quantity;`

❌ **Không bỏ qua `@Transactional` khi update nhiều entity**
- Sai: Method tạo invoice + items mà không `@Transactional` → lỗi không đồng bộ

❌ **Không return null từ method**
- Sai: `return null;` ← Phải throw exception hoặc return Optional

❌ **Không để external config (API key, password) trong code**
- Sai: `private String CLOUDINARY_KEY = "xxx";` ← Phải dùng environment variable

❌ **Không dùng `new Date()` / `System.currentTimeMillis()`**
- Sai: Dùng `LocalDateTime.now()` ← Consistent với database format

❌ **Không ignore exception**
- Sai: `try { } catch (Exception e) { }` ← Phải log hoặc re-throw

---

# 5. WORKFLOW

## Quy trình phát triển ngày thường

### Khi nhận task (feature/bug)
- Đọc requirement kỹ càng, nếu không rõ hỏi lại
- Xác định module nào cần thay đổi

### Implement 
- Cập nhật entity/domain nếu cần
- Viết/update mapper
- Viết service logic
- Viết controller endpoint
- Viết unit test (service + mapper)
- Format code (IDE auto-format)

### Sau mỗi thay đổi lớn
- **Update documentation:**
  - Cập nhật API endpoint trong `notes/api-list.md` nếu có endpoint mới
  - Cập nhật architecture doc nếu thay đổi structure
  - Cập nhật hướng dẫn hệ thống trong `.github/instructions/` nếu cần
- **Update tasks.md:** Tick [x] nếu task hoàn thành

---

# 6. CÁC TÍNH NĂNG ĐÃ TRIỂN KHAI (quét codebase - 2026-04-17)

Dưới đây là danh sách tóm tắt các tính năng đã triển khai được phát hiện khi quét codebase. Mỗi mục liệt kê module, các endpoint chính (controller), và các hành vi service quan trọng đã được triển khai trong repository.

- Auth
    - Controllers: `/api/v1/auth` (`AuthController`)
        - POST `/login` — authenticate username/password và trả về JWT token
        - POST `/register` — đăng ký user mới (kiểm tra password + confirm)
        - GET `/home` — redirect target khi OAuth2 thành công (mock)
        - POST `/token` — validate token từ Authorization header
    - Services: `AuthService`, `JwtService`, `CustomUserDetailsService`
        - Hash password khi đăng ký (`PasswordEncoder`)
        - Tạo và validate JWT (`JwtService`)
        - Hỗ trợ OAuth2: `CustomOAuth2Service` + `CustomOAuth2SuccessHandler` phát hành JWT cookie

- Brand
    - Controllers: `/api/v1/brands` (`BrandController`)
        - GET all, GET by id, POST create, PUT update, DELETE hard delete
    - Services: `BrandService`
        - CRUD brand với kiểm tra NotFound và guard chống xóa brand đang được tham chiếu

- Note
    - Controllers: `/api/v1/notes` (`NoteController`)
        - GET all, GET by id, POST create, PUT update, DELETE
    - Services: `NoteService`
        - CRUD note với kiểm tra NotFound và guard chống xóa note đang được perfume sử dụng

- Volume
    - Controllers: `/api/v1/volumes` (`VolumeController`)
        - GET all, GET by id, POST create, PUT update, DELETE
    - Services: `VolumeService`
        - CRUD volume với kiểm tra NotFound và guard chống xóa volume đang được perfume sử dụng

- Perfume (Catalog)
    - Controllers: `/api/v1/perfumes` (`PerfumeController`)
        - GET paginated/filter (name, gender, price range, orderBy)
        - GET by id
        - POST create (multipart/form-data, upload sample image)
        - PUT update (multipart/form-data, cập nhật volumes/notes/images)
        - DELETE perfume (xóa remote image)
    - Services: `PerfumeService`
        - Toàn bộ flow create/update/delete ở dạng transactional
        - Persist `Perfume`, `VolumePerfume`, `NotePerfume`, `SampleImage`
        - Dùng `PerfumeSpecification` để filter và mapping `PageResponse`
        - Tích hợp Cloudinary để upload và delete image (`CloudinaryService`)

- Invoice
    - Controllers: `/api/v1/invoices` (`InvoiceController`)
        - GET danh sách invoice có phân trang với filter (search, date, total, delivery/payment status)
        - GET chi tiết invoice theo id
        - POST tạo invoice (dùng authenticated user id từ `SecurityContextGetter`)
        - PATCH update status (admin), PATCH cancel (user)
    - Services: `InvoiceService`
        - Tạo invoice cùng invoice details, tính total, persist `Invoice` và `InvoiceDetails`
        - Danh sách có phân trang sử dụng `InvoiceSpecification`
        - Business rule: ràng buộc cancel/update, kiểm tra NotFound

- User
    - Admin endpoints: `/api/v1/admin/users` (`UserAdminController`)
        - GET user có phân trang, GET user theo id, POST tạo user (default password), POST reset-password, PUT update
        - Service: `UserAdminService` (hash password, CRUD, pagination)
    - Self endpoints: `/api/v1/users/me` (`UserSelfController`)
        - GET profile của user hiện tại (qua `SecurityContextGetter` và `UserSelfService`)
    - Addresses: `/api/v1/users/me/addresses` (`UserAddressController`)
        - GET all, POST create, PUT update, PATCH soft-delete
        - Service: `UserAddressService` (validation user/address, soft-delete)

- Security & Platform
    - `SecurityConfig` thiết lập quy tắc truy cập theo path, OAuth2 login, chèn JWT filter, và password encoder
    - `JwtAuthenticationFilter` parse Bearer token, validate và thiết lập Spring Security context
    - `SecurityContextGetter` đọc authenticated user id từ security context

- Common / Infra
    - Response envelope: `ApiResponseFactory` được controller sử dụng
    - Global exception handling: `GlobalExceptionsHandler` (map exception sang ApiResponse)
    - Cloudinary config/service cho upload/delete image (`CloudinaryConfig`, `CloudinaryService`)
    - JPA Specification cho filter: `PerfumeSpecification`, `InvoiceSpecification`
---
