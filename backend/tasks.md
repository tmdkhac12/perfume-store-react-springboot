# Kế hoạch triển khai tài liệu API (`api-list.md`)

Tài liệu này đóng vai trò là hợp đồng giữa Backend và Frontend, giúp Frontend dev có thể mock dữ liệu chính xác.

## 🎯 Mục tiêu
- Liệt kê đầy đủ 100% endpoints hiện có.
- Mô tả rõ ràng Request (params, body) và Response (success, error).
- Đảm bảo đúng chuẩn `ApiResponse` envelope như đã quy định trong `AGENTS.md`.

---

## 🛠 Kế hoạch triển khai

### Phase 1: Khởi tạo & Định nghĩa chuẩn tài liệu
- [x] Thiết lập cấu trúc file `notes/api-list.md`.
- [x] Định nghĩa Format chung cho một Endpoint (Method, Path, Auth, Request, Response).
- [x] Liệt kê các mã lỗi (Error Codes) chung của hệ thống.

### Phase 2: Tài liệu hóa các Module cơ bản (Master Data)
- [x] Tài liệu hóa Module **Auth** (Login, Register, Token validation).
- [x] Tài liệu hóa Module **Brand** (CRUD brands).
- [x] Tài liệu hóa Module **Note** (CRUD perfume notes).
- [x] Tài liệu hóa Module **Volume** (CRUD perfume volumes).

### Phase 3: Tài liệu hóa Module nghiệp vụ chính (Core Logic)
- [x] Tài liệu hóa Module **Perfume** (Search/Filter, Details, Create/Update with Cloudinary).
- [x] Tài liệu hóa Module **Invoice** (Checkout, Order history, Status management).
- [x] Tài liệu hóa Module **User** (Profile, Admin user management, Address management).

### Phase 4: Kiểm tra & Hoàn thiện
- [x] Kiểm tra tính nhất quán với `AGENTS.md` (kebab-case, ApiResponse).
- [x] Review lại toàn bộ file để đảm bảo không thiếu Field nào trong DTO.
- [x] Bàn giao file `api-list.md` cho Frontend.

---

## ✅ Tiêu chí hoàn thành (Definition of Done)
1. Mọi Controller trong `src/main/java/com/example/perfume_store/modules/` đều có mặt trong tài liệu.
2. Các Request Body được mô tả rõ kiểu dữ liệu (String, Number, Array, Object).
3. Response phải thể hiện đúng cấu trúc bọc:
   ```json
   {
     "status": 200,
     "message": "...",
     "data": { ... },
     "error": null
   }
   ```
4. Các endpoint yêu cầu quyền (Admin/User) phải được đánh dấu rõ ràng.
