# MIGRATED
Nội dung của file này đã được migrate và tách thành các hướng dẫn GitHub Copilot nhỏ hơn trong `.github/copilot-instructions.md` và `.github/instructions/**.md`.
Vui lòng tham khảo các file nhỏ hơn trong thư mục đó để xem hướng dẫn cụ thể cho repository.

# Các tính năng đã triển khai (quét codebase - 2026-04-17)

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

Ghi chú / Khoảng trống đã biết (quan sát từ quá trình quét code)
- Unit test đã có cho service và mapper (xem `src/test/...`) nhưng chưa phải mọi service đều có độ bao phủ đầy đủ.
- Một số component kỳ vọng env var (JWT secret, Cloudinary, MySQL) được cấu hình trong `application.yaml`.
- Flow OAuth2 tạo hoặc đồng bộ user theo Google id; hành vi frontend và thiết lập token cookie đầy đủ phụ thuộc vào runtime env.

Danh sách này được tổng hợp từ các triển khai controller và service có trong repository tại thời điểm 2026-04-17.

## Cập nhật phiên làm việc — 2026-04-17

Tóm tắt công việc đã hoàn thành trong phiên tương tác này:

- Đã xác định và xác nhận các lớp mục tiêu cho unit test của `modules/auth`, đồng thời đánh dấu Task 1 hoàn tất trong `tasks.md`.
- Đã tạo các file skeleton unit test (Task 2) dưới `src/test/java/com/example/perfume_store/modules/auth/` và đánh dấu Task 2 hoàn tất trong `tasks.md`.
  - File đã thêm (skeleton):
    - `AuthServiceTest.java`
    - `JwtServiceTest.java` (placeholder)
    - `CustomUserDetailsServiceTest.java`
    - `CustomOAuth2ServiceTest.java` (lightweight skeleton)
    - `CustomOAuth2SuccessHandlerTest.java` (behavioral skeleton)
    - `JwtAuthenticationFilterTest.java`
    - `AuthMapperTest.java` (instantiates MapStruct impl)

Trạng thái repository hiện tại (đã làm xong và còn pending):

- Done
  - Hướng dẫn về architecture & agent đã được ghi trong `AGENTS.md` (inventory + testing convention).
  - `tasks.md` đã được cập nhật với checklist chi tiết; Task 1 và Task 2 đã được tick.
  - Các skeleton unit test cơ bản đã được commit vào workspace.

- Pending
  - Task 3: triển khai test case chi tiết cho từng skeleton (happy path, validation, exception flow).
  - Task 4: tuân thủ đầy đủ và xác minh testing pattern của dự án trong quá trình triển khai (dùng AssertJ, khởi tạo MapStruct, không truy cập DB/cloudinary thật).
  - Task 5: chạy `mvn clean test`, sửa test lỗi và vấn đề compile, rồi cập nhật tiến độ trong `tasks.md`.

Các quyết định kỹ thuật chính trong phiên này và lý do:

- Dùng JUnit 5 + Mockito + AssertJ cho unit test (khớp với test hiện có của dự án).
  Lý do: các test hiện có trong repository dùng stack này; giúp nhất quán và phản hồi nhanh.

- Khởi tạo trực tiếp implementation MapStruct trong mapper test (ví dụ `new AuthMapperImpl()`).
  Lý do: các mapper test hiện có trong codebase tuân theo pattern này; tránh phải khởi động Spring context.

- Mock `JwtService` trong hầu hết test phụ thuộc và giữ một test placeholder tối thiểu cho chính `JwtService`.
  Lý do: logic JWT crypto cần test secret ổn định và liên quan đến expiration theo thời gian; mock giúp test phụ thuộc có tính deterministic và tránh flakiness.

- Không chạm vào hệ thống bên ngoài trong unit test (MySQL, Cloudinary, filesystem). Thay vào đó mock repository và external service.
  Lý do: giữ unit test được cô lập, nhanh và đáng tin cậy; tuân theo convention hiện có của repository.

- Dùng `@ExtendWith(MockitoExtension.class)`, `@Mock`, `@InjectMocks` trong skeleton.
  Lý do: phù hợp với pattern đang dùng trong các file `src/test` hiện tại và đảm bảo cô lập dependency rõ ràng.

Các bước tiếp theo ngay trong phiên kế tiếp (khuyến nghị):

1. Triển khai test cụ thể cho từng skeleton trong `src/test/java/com/example/perfume_store/modules/auth/` theo checklist trong `tasks.md`:
   - `AuthServiceTest`: success, password mismatch, duplicate save error.
   - `CustomUserDetailsServiceTest`: load found / not found.
   - `CustomOAuth2ServiceTest`: cập nhật Google id đã tồn tại, tạo account mới (có thể cần Mockito stubbing cho hành vi `super.loadUser` hoặc refactor để `processOAuth2User` dễ test).
   - `CustomOAuth2SuccessHandlerTest`: assert cookie được thêm và redirect strategy được gọi (dùng mocked `HttpServletResponse` writer hoặc verify `addCookie`).
   - `JwtAuthenticationFilterTest`: đường đi token hợp lệ thiết lập SecurityContext; đường đi token không hợp lệ ghi response 401 và body ApiResponse.

2. Chạy `mvn clean test` trên máy local, lặp lại để xử lý test lỗi, và cập nhật tick box trong `tasks.md` khi từng mục hoàn thành.

3. Nếu cần test hành vi `JwtService`, hãy thêm test secret chuyên dụng (base64url dài) trong test resources và viết các crypto test tập trung; nếu không thì tiếp tục mock nó.

Các file đã thay đổi trong phiên này (tóm tắt):

- Modified: `tasks.md` (đánh dấu Task 1 và Task 2 hoàn tất)
- Modified: `AGENTS.md` (đã append cập nhật phiên làm việc này)
- Added: test skeleton dưới `src/test/java/com/example/perfume_store/modules/auth/` (xem danh sách ở trên)

Cách chạy các test mới trên local (PowerShell):

```powershell
mvn clean test
```

Nếu bạn muốn, tôi có thể tiếp tục triển khai Task 3 ngay bây giờ (viết đầy đủ test và chạy `mvn clean test`) — hãy xác nhận và tôi sẽ tiếp tục.

