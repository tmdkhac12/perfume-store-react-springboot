---
applyTo: "**/api-list.md"
---
# Quy ước viết tài liệu API tiêu chuẩn

Tài liệu này quy định cấu trúc và quy tắc trình bày danh sách API, đảm bảo tính chuyên nghiệp, đồng nhất và dễ hiểu cho mọi dự án phần mềm.

## 1. Cấu trúc tổng thể
- **Tiêu đề chính**: Sử dụng `# [Tên Dự Án] API Documentation`.
- **Phần giới thiệu**: Mô tả ngắn gọn mục đích của tài liệu.
- **Thông tin chung**: Sử dụng `##` (H2) cho các phần:
  - 📌 Thông tin chung (Base URL, Version, Format, Auth method).
  - 🏗 Cấu trúc Response chuẩn (Mô tả envelope của API).
  - ❌ Các mã lỗi thường gặp (Bảng liệt kê mã lỗi).
  - 🔑 Authentication (Chi tiết về Header và cách lấy Token).
- **Phân tách Module**: Sử dụng `---` (Đường kẻ ngang) giữa các Module khác nhau.
- **Tiêu đề Module**: Định dạng `## [Emoji] [Tên Module] Module`.

## 2. Quy tắc trình bày Endpoint
Mỗi endpoint phải được trình bày rõ ràng theo thứ tự:

### [Số thứ tự]. [Tên chức năng]
- **Số thứ tự**: Phải đảm bảo tính liên tục trong một Module. Nếu có phân cấp (như Admin), sử dụng `#### [Số Module].[Số tiểu mục]. [Tên]` (VD: `#### 1.1. Lấy danh sách`).
- **Endpoint:** `[METHOD] [PATH]` (Ví dụ: `POST /api/v1/users`).
- **Auth:** Xác định rõ ràng:
  - `None`: API công khai.
  - `Bearer Token`: Yêu cầu JWT.
  - `Bearer Token (Role/Permission)`: Yêu cầu quyền cụ thể.
- **Query Parameters / Path Variables** (Nếu có): Liệt kê dưới dạng danh sách hoặc bảng kèm mô tả.
- **Request Body** (Nếu có): Khối mã JSON mẫu hoàn chỉnh.
- **Response**: Khối mã JSON mẫu hoàn chỉnh của phản hồi thành công.

## 3. Quy chuẩn dữ liệu mẫu (JSON) - QUAN TRỌNG
Đây là quy tắc cốt lõi để đảm bảo chất lượng tài liệu:
- **Tuyệt đối không viết tắt**: Không sử dụng `...`, `...rest...`, hoặc `{ "id": 1, ... }`. Mọi đối tượng JSON phải được viết đầy đủ tất cả các trường.
- **Dữ liệu thực tế và có ý nghĩa**: 
  - Sử dụng tên người, email, địa chỉ và giá trị thực tế thay vì dữ liệu vô nghĩa như "string", "test", "abc".
  - Đảm bảo tính nhất quán của dữ liệu mẫu xuyên suốt tài liệu.
- **Quy tắc đặt tên**: Sử dụng `camelCase` cho tất cả các key trừ khi dự án có quy định khác.
- **Đầy đủ cấu trúc Response**: Mẫu Response phải bao gồm cả phần Envelope (timestamp, status, path, message, error) và phần `data` thực tế.
- **Định dạng thời gian**: Sử dụng chuẩn ISO 8601 (Ví dụ: `2026-05-08T10:00:00Z`).

## 4. Phân trang (Pagination)
Đối với các API trả về danh sách có phân trang, cấu trúc trong phần `data` phải bao gồm:
```json
{
  "content": [ /* Danh sách các object đầy đủ */ ],
  "page": 0,
  "size": 10,
  "totalElements": 100,
  "totalPages": 10
}
```

## 5. Quản lý thay đổi
- Khi thêm một endpoint mới vào giữa danh sách, **bắt buộc** phải cập nhật lại toàn bộ số thứ tự của các endpoint phía sau để duy trì tính chính xác.
- Luôn giữ dòng trạng thái ở cuối tệp để thông báo về việc cập nhật:
  `*(Danh sách chi tiết các API sẽ được cập nhật trong các phase tiếp theo)*`
