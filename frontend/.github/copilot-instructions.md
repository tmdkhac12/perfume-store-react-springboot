# Quy Tắc Toàn Cục

- Giao tiếp: Người dùng nhập prompt bằng tiếng Việt. Hãy phản hồi và giải thích bằng tiếng Việt khi đưa ra hướng dẫn hoặc diễn giải.
- Mã nguồn: TOÀN BỘ source code, unit test, tên biến, comment BẮT BUỘC bằng tiếng Anh. Tuy nhiên toàn bộ tài liệu phải bằng tiếng Việt.
- Tính nhất quán: Nếu người dùng mô tả tính năng bằng tiếng Việt, hãy chuyển đổi khái niệm sang thuật ngữ domain tiếng Anh đã chuẩn hóa (ví dụ: "Hóa đơn" -> "Invoice").

- File hướng dẫn: Hướng dẫn theo từng đường dẫn nằm trong `.github/instructions/*.instructions.md` (mỗi file phải có YAML header `applyTo`). Luôn kiểm tra `.github/copilot-instructions.md`, `.github/instructions/*`, và `AGENTS.md` trước khi tạo hoặc sửa mã.
- Chính sách cập nhật: Khi thay đổi rule AI/agent, hãy cập nhật `.github/copilot-instructions.md` và các file liên quan trong `.github/instructions/`.

- Bộ hướng dẫn React JS cho workspace này:
	- `.github/instructions/react-core.instructions.md`
	- `.github/instructions/react-routing-layout.instructions.md`
