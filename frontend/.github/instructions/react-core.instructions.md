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

## RULE: FUNCTION DOCUMENTATION PROTOCOL

Mọi hàm (function), hằng số xử lý logic (arrow function) hoặc React Component khi tạo mới hoặc cập nhật phải tuân thủ quy định comment JSDoc.

1. **Vị trí**: Comment phải nằm ngay phía trên khai báo hàm.
2. **Ngôn ngữ**: Sử dụng tiếng Anh cho nội dung comment bên trong code.
3. **Định dạng**: Khối comment `/** ... */`.
4. **Cú pháp**:
   - **Với React Components**: Chỉ cần `@description`.
     ```javascript
     /** @description: [Short description of component role] */
     ```
   - **Với Logic Functions**: 
     ```javascript
     /**
      * @description: [What it does and why it is needed]
      * @param {[type]} [name] - Example: [value]
      * @returns {[type]} [name] - Example: [value]
      */
     ```
     *Lưu ý: Nếu input/output không rõ ràng (ví dụ: event, void), hãy thay thế `@param`/`@returns` bằng `@flow` để làm rõ luồng hoạt động của function*
     *Lưu ý: Nếu input rõ ràng nhưng output return về `void` (ví dụ: event, void), hãy comment kế bên đoạn `@return` đó rằng sau function này chúng ta sẽ nhận được gì, ví dụ '@returns {void} - formValues with field and value updated'*

**Ví dụ áp dụng:**
/** @description: Standalone registration form component. */
const RegisterForm = () => { ... }

/**
 * @description: Extracts JWT payload to read role metadata.
 * @param {string} token - Example: "header.payload.signature"
 * @returns {import('./types').JwtPayload | null} payload - Example: { role: [...] }
 */
const decodeTokenPayload = (token) => { ... }

/**
  * @description: Submits the registration form to the backend. Routes the user to the login page upon success.
  * @flow: Step 1 -> Step 2.
  */
const handleSubmit = async (event) => { ... }