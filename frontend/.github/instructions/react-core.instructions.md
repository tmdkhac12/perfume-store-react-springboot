---
applyTo: "src/**/*.{js,jsx,css}"
description: "Dùng khi triển khai hoặc refactor file mã nguồn React JS trong frontend workspace này. Áp dụng chiến lược parity-first, nhất quán thiết kế và tái sử dụng nền tảng sẵn có."
---

# Quy Tắc React Core

## Phạm Vi Và Mục Tiêu
- Giữ chiến lược migration theo parity-first: ưu tiên parity hành vi trước, nhất quán thiết kế sau, tối ưu hóa cuối cùng.
- Chỉ triển khai đúng phạm vi được yêu cầu và tránh refactor không liên quan.
- Giữ giả định static-first cho đến khi backend integration được triển khai rõ ràng.

## Kiến Trúc Và Tái Sử Dụng
- Tái sử dụng nền tảng hiện có trước khi tạo pattern mới:
  - `src/layouts/*`
  - `src/components/base/*`
  - `src/hooks/*`
  - `src/utils/*`
- Ưu tiên composition thay vì lặp lại và giữ component tập trung đúng trách nhiệm.
- Giữ cách đặt tên route và domain đồng bộ với kế hoạch hiện tại trong `tasks.md`.

## UI Và Styling
- Bảo toàn định hướng luxury-minimal hiện tại (khoảng trắng sạch, tương phản tiết chế, chuyển động tinh tế).
- Giữ typography theo tiêu chuẩn dự án:
  - Phần tiêu đề và điểm nhấn thương hiệu: Noto Serif
  - Nội dung thân bài và văn bản tiện ích: Manrope
- Ưu tiên dùng Tailwind utility classes trước.
- Tránh khối CSS tùy biến lớn trừ khi mức độ lặp lại đủ để tách ra.
- Tái sử dụng CSS variables và utility tokens hiện có từ `src/assets/styles/global.css`.

## Quy Tắc Triển Khai React
- Sử dụng functional components và hooks.
- Giữ toàn bộ code, tên biến, comment, test và UI strings bằng tiếng Anh.
- Chuyển logic tương tác sang React state/events/hooks; không đưa lại inline page scripts.
- Sử dụng semantic elements:
  - Dùng links cho route navigation.
  - Dùng buttons cho các thao tác trong trang (toggle modal, cập nhật số lượng, thay đổi state cục bộ).

## Chất Lượng Và An Toàn
- Giữ thay đổi tối thiểu và cục bộ trong phạm vi tính năng được yêu cầu.
- Ưu tiên các utility mang tính xác định và tái sử dụng được cho logic format/validation.
- Bảo toàn hành vi responsive tại các breakpoint hiện tại (`sm`, `md`, `lg`) trong quá trình migration.
