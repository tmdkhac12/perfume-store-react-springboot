---
applyTo: "src/test/java/**/*.java"
---
# Quy tắc Testing
- Vị trí & phạm vi: Unit test nằm dưới `src/test/java/...` và chủ yếu nhắm tới layer `service` và `mapper` (xem `src/test/java/com/example/perfume_store/modules/*/service/*Test.java` và `.../mapper/*Test.java`).
- Framework: JUnit 5 + Mockito + AssertJ. File ví dụ: `BrandServiceTest.java`, `VolumeServiceTest.java`, `BrandMapperTest.java`.
- Cấu hình Mockito: dùng `@ExtendWith(MockitoExtension.class)` ở cấp class, `@Mock` cho dependency bên ngoài và `@InjectMocks` cho service đang test. Dùng `when(...).thenReturn(...)` và `verify(...)` để assert tương tác.
- Quy tắc cô lập: Test TUYỆT ĐỐI KHÔNG chạm vào database thật, Cloudinary, hoặc filesystem. Hãy mock repository, mapper, external service (Cloudinary/CloudinaryService, JwtService, v.v.).
- Mapper test: khởi tạo trực tiếp MapStruct impl được sinh ra (ví dụ, `brandMapper = new BrandMapperImpl()`), không khởi động Spring context cho unit test của mapper.
- Kiểu assertion: dùng AssertJ `assertThat(...)` cho giá trị và `assertThatThrownBy(...)` cho assertion exception. Dùng `@DisplayName` để cung cấp mô tả test dễ đọc.
- Cấu trúc test & helper: ưu tiên private factory method nhỏ để tạo test entity/DTO (xem `BrandServiceTest#createBrand(...)`). Đặt tên method test theo `subject_scenario_expected` hoặc dùng `@DisplayName`.
- Test exception: assert exception được throw và message của nó (ví dụ: `NotFoundException`, `IllegalStateException`). Ưu tiên `assertThatThrownBy(...).isInstanceOf(...).hasMessage(...)`.
- Tránh Spring context khi không cần: chỉ dùng `@SpringBootTest` cho kiểm tra `contextLoads()` tối thiểu (ví dụ `PerfumeStoreApplicationTests`). Integration test (controller/repository/specification) tách riêng và nên dùng setup chuyên biệt.
- Chạy test: dùng lệnh Maven:
```
mvn clean test
```
