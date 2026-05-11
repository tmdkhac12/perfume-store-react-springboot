# Quy tắc toàn cục

- Giao tiếp: Người dùng nhập prompt bằng tiếng Việt. Hãy phản hồi và giải thích bằng tiếng Việt khi cung cấp giải thích hoặc hướng dẫn.
- Code: TOÀN BỘ source code, unit test, tên biến, comment BẮT BUỘC phải bằng tiếng Anh. Tuy nhiên toàn bộ tài liệu phải bằng tiếng Việt.
- Tính nhất quán: Nếu người dùng mô tả một tính năng bằng tiếng Việt, hãy dịch các khái niệm sang các thuật ngữ domain tiếng Anh đã được thiết lập (ví dụ: "Hóa đơn" -> "Invoice").
- Phong cách: Ưu tiên mô hình modular monolith, tuân theo luồng `controller -> service -> mapper -> dto`. Nếu tính năng thuộc về user (như thông tin cá nhân hoặc đơn hàng của user), hãy tách service/mapper vào module `user`.
- Cấu hình: Luôn đảm bảo `ObjectMapper` được cấu hình với `JavaTimeModule` để hỗ trợ `java.time` (Instant, LocalDateTime) trong các API responses.
- File hướng dẫn: Hướng dẫn theo từng đường dẫn nằm trong `.github/instructions/*.instructions.md` (mỗi file nên có YAML header `applyTo`). Luôn kiểm tra `.github/copilot-instructions.md`, `.github/instructions/*`, và `AGENTS.md` trước khi tạo code hoặc test.
- Chính sách cập nhật: Khi thay đổi các quy tắc AI/agent, hãy cập nhật `.github/copilot-instructions.md` và (các) file liên quan trong `.github/instructions/`
