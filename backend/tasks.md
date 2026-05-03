# Kế hoạch triển khai Unit Test - Module Perfume

## 🎯 Mục tiêu
Đảm bảo độ tin cậy của logic nghiệp vụ trong module `perfume`, tập trung vào `PerfumeService` và `PerfumeMapper`, tuân thủ nghiêm ngặt các nguyên tắc tại `.github/instructions/testing.instructions.md`.

---

## 🏗️ Phân Phase Triển khai

### Phase 1: Chuẩn bị & Mocking 
- [x] Khởi tạo cấu trúc thư mục test cho perfume module: `src/test/java/com/example/perfume_store/modules/perfume/`.
- [x] Xác định và chuẩn bị các mẫu dữ liệu test (test data factory methods) cho Entity và DTO.
- [x] Đảm bảo các dependency của `PerfumeService` có thể mock được dễ dàng.

### Phase 2: Unit Test cho PerfumeMapper 
- [x] Viết test cho `toDetailsResponseDTO`: Kiểm tra mapping Brand, VolumePerfume, NotePerfume.
- [x] Viết test cho các helper methods: `map` (SampleImage), `mapToFirstImage`, `mapNotes`.
- [x] Viết test cho `toPublicResponseDTO` và `toPublicPageResponse`: Kiểm tra tính toán `minPrice` và phân trang.
- [x] Viết test cho mapping request sang entity: `toEntity` (Create) và `updateEntity` (Update).
- **Tiêu chí hoàn thành:** Toàn bộ các method trong `PerfumeMapper` được bao phủ, kiểm tra chính xác các field mapping phức tạp.

### Phase 3: Unit Test cho PerfumeService - Query & Basic CRUD 
- [x] Viết test cho `getPaginatedPerfumes`:
    - [x] Kiểm tra phân trang và sorting (mặc định, theo tên, theo giá).
    - [x] Kiểm tra filtering (theo tên, giới tính, khoảng giá).
- [x] Viết test cho `getPerfumeById`:
    - [x] Case: Tìm thấy perfume (Success).
    - [x] Case: Không tìm thấy perfume (Throw `NotFoundException`).
- [x] Viết test cho `createPerfume`:
    - [x] Kiểm tra luồng lưu perfume, mapping brand, volumes và notes.
    - [x] Kiểm tra luồng upload ảnh ban đầu.
- **Tiêu chí hoàn thành:** Các hàm truy vấn và tạo mới cơ bản hoạt động đúng, xử lý exception chuẩn.

### Phase 4: Unit Test cho PerfumeService - Logic phức tạp (Update/Delete) 
- [x] Viết test cho `updatePerfume`:
    - [x] Case: Cập nhật thông tin cơ bản và brand thành công.
    - [x] Case: Cập nhật (xóa cũ thêm mới) VolumePerfume và NotePerfume.
    - [x] Case: Xử lý cập nhật ảnh (xóa ảnh cũ trên Cloudinary, thêm ảnh mới).
    - [x] Case: Throw `BadRequestException` khi xóa hết ảnh (không còn ảnh nào).
- [x] Viết test cho `deletePerfume`:
    - [x] Kiểm tra việc xóa perfume và gọi `cloudinaryService.deleteFileByUrl` cho các ảnh liên quan.
    - [x] Kiểm tra việc handle exception khi xóa ảnh trên Cloudinary thất bại (log error nhưng vẫn tiếp tục xóa DB).
- **Tiêu chí hoàn thành:** Logic phức tạp về quản lý ảnh và quan hệ đa-đa (Note/Volume) được verify kỹ lưỡng.

### Phase 5: Tổng kết & Kiểm tra chuẩn 
- [x] Chạy toàn bộ test suite của module perfume.
- [x] Kiểm tra việc tuân thủ quy tắc: Không dùng Spring Context, dùng Mockito, dùng AssertJ.
- [x] Đảm bảo `@DisplayName` đầy đủ và dễ hiểu.
- [x] Dọn dẹp code thừa và refactor helper methods nếu cần.

---

## 📝 Ghi chú quan trọng
- **Framework:** JUnit 5, Mockito, AssertJ.
- **Cách tiếp cận:**
    - Mapper: Khởi tạo trực tiếp `new PerfumeMapperImpl()`.
    - Service: Dùng `@ExtendWith(MockitoExtension.class)`.
- **Mocking:** Tuyệt đối không gọi thật tới Cloudinary hay Database.
- **Validation:** Mỗi pull request/commit liên quan đến test phải đảm bảo code coverage tối thiểu cho logic quan trọng.
