# 🧪 Kế hoạch Unit Test - Module Invoice

Tài liệu này chi tiết hóa các bước thực hiện unit test cho module `invoice`, tuân thủ các quy tắc trong `.github/instructions/testing.instructions.md`.

## 🎯 Mục tiêu
- Đạt 100% test coverage cho logic nghiệp vụ tại `InvoiceService`.
- Đảm bảo tính chính xác của dữ liệu chuyển đổi trong `InvoiceMapper`.
- Tuân thủ quy tắc cô lập (mocking) và không chạm vào database/Spring context.

---

## 🛠 Thứ tự triển khai (Priority)

1.  **InvoiceMapperTest**: Đảm bảo mapping dữ liệu đúng trước khi test service.
2.  **InvoiceService (Read operations)**: `getInvoiceDetails`, `getPaginatedInvoices`.
3.  **InvoiceService (Business logic updates)**: `updateInvoiceStatus`, `updateInvoiceStatusUser`.
4.  **InvoiceService (Complex creation)**: `createInvoice` (tính toán tiền, lưu nhiều bảng).

---

## 📋 Danh sách Task triển khai

### Phase 1: Unit Test cho InvoiceMapper
- [x] Khởi tạo class `InvoiceMapperTest`.
- [x] Test `toPublicResponse`: Chuyển đổi Invoice entity sang public DTO.
- [x] Test `toInvoiceDetailsResponse`: Chuyển đổi Invoice kèm danh sách details.
- [x] Test `toInvoiceDetailsDTO`: Mapping từng dòng chi tiết hóa đơn.
- [x] Test `toPageResponse`: Mapping kết quả phân trang.

### Phase 2: Unit Test cho InvoiceService - Nhóm Read & Pagination
- [x] Khởi tạo `InvoiceServiceTest` với `@ExtendWith(MockitoExtension.class)`.
- [x] Test `getInvoiceDetails`:
    - [x] Trường hợp thành công.
    - [x] Trường hợp throw `NotFoundExcepti
    - on` khi không tìm thấy ID.
- [x] Test `getPaginatedInvoices`:
    - [x] Kiểm tra việc gọi đúng `invoiceRepository.findAll` với `Specification`.
    - [x] Kiểm tra kết quả trả về qua `PageResponse`.

### Phase 3: Unit Test cho InvoiceService - Nhóm Update & Business Rules
- [x] Test `updateInvoiceStatus` (Admin):
    - [x] Trường hợp thành công (Pending -> Confirmed, v.v.).
    - [x] Trường hợp throw `IllegalStateException` khi cập nhật invoice đã Cancelled.
- [x] Test `updateInvoiceStatusUser` (User Cancel):
    - [x] Trường hợp thành công (Pending -> Cancelled).
    - [x] Trường hợp throw `IllegalStateException` khi cancel invoice không ở trạng thái Pending.
    - [x] Trường hợp throw `NotFoundException` khi invoice không thuộc về user.

### Phase 4: Unit Test cho InvoiceService - Logic Tạo Hóa Đơn (Create)
- [x] Test `createInvoice`:
    - [x] Mock dữ liệu: User, Address, VolumePerfume.
    - [x] Kiểm tra tính đúng đắn của việc cộng dồn `total` (BigDecimal).
    - [x] Kiểm tra việc set các thông tin copy từ Address (receiver, phone, address string).
    - [x] Kiểm tra việc gọi `save` cho Invoice và `saveAll` cho InvoiceDetails.
    - [x] Trường hợp throw `NotFoundException` cho từng loại dependency (User, Address, v.v.).

### Phase 5: Tổng kết & Hoàn thiện
- [x] Chạy toàn bộ test suite của module invoice (`mvn test -Dtest=Invoice*`).
- [x] Đảm bảo code style tuân thủ convention (naming `subject_scenario_expected`) và quy tắc tại `testing.instructions.md`.
- [x] Refactor `InvoiceServiceTest.java` sử dụng private helper factory methods.
- [x] Xóa các file test rác hoặc code dư thừa.

---

## ✅ Tiêu chí hoàn thành (Definition of Done)
1. [x] Tất cả các method public trong `InvoiceService` đều có ít nhất một test case success và một test case failure (nếu có logic).
2. [x] Không có test nào sử dụng `@SpringBootTest` (giữ tốc độ test nhanh).
3. [x] Sử dụng AssertJ (`assertThat`) cho tất cả các câu lệnh kiểm tra.
4. [x] Mockito được sử dụng đúng cách để cô lập service khỏi repository và mapper.
5. [x] Tỷ lệ pass là 100%.
