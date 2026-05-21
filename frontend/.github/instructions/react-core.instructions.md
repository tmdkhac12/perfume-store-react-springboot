---
applyTo: 'src/**/*.{js,jsx,css}'
description: 'Dùng khi triển khai hoặc refactor file mã nguồn React JS trong frontend workspace này. Áp dụng chiến lược parity-first, nhất quán thiết kế và tái sử dụng nền tảng sẵn có.'
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

## RULE: FUNCTION & TYPE DOCUMENTATION PROTOCOL

Mọi hàm (function), hằng số xử lý logic (arrow function), React Component hoặc biến phức tạp khi tạo mới hoặc cập nhật phải tuân thủ quy định comment JSDoc và hệ thống Type trung tâm.

### 1. Quản Lý Types Trung Tâm

- **Vị trí**: Định nghĩa types tại file `types/index.js` của mỗi feature (ví dụ: `src/features/auth/types/index.js`).
- **Cú pháp**: Sử dụng `@typedef` và `@property`. Luôn đi kèm ví dụ cụ thể.
  ```javascript
  /**
   * @typedef {Object} UserProfile
   * @property {number} id - Example: 1
   * @property {string} name - Example: "Jane Doe"
   */
  ```

### 2. Sử Dụng Types Trong Logic & Components

- **Referencing**: Luôn tham chiếu type từ file trung tâm bằng cú pháp `import`.
  - `@param {import('./types').TypeName} name`
  - `@returns {import('../types').TypeName | null} name`
- **In-line Typing**: Sử dụng `/** @type {Type} */` cho các biến local phức tạp hoặc payload trước khi gửi API.
- **Advanced Types**:
  - Sử dụng `keyof import(...).Type` cho các tham số định danh field (ví dụ: trong `handleFieldChange`).
  - Sử dụng `@template T` cho các utility/response generic.

### 3. Định Dạng Comment (JSDoc)

- **Vị trí**: Ngay phía trên khai báo.
- **Ngôn ngữ**: Tiếng Anh.
- **React Components**: Chỉ cần `@description`.
  ```javascript
  /** @description: [Short description of component role] */
  ```
- **Logic Functions**:

  ```javascript
  /**
   * @description: [What it does and why]
   * @param {import('./types').Type} [name] - Example: [value]
   * @returns {import('./types').Type} [name] - Example: [value]
   */
  ```

  - Nếu input/output không rõ ràng hoặc là event phức tạp: Dùng `@flow: Step 1 -> Step 2`.
  - Nếu `@returns {void}`: Ghi chú kết quả sau khi thực thi (ví dụ: `- state updated`).

**Ví dụ áp dụng:**
/\*\*

- @description: Updates form fields based on user input.
- @param {keyof import('../types').LoginRequest} field - Example: "username"
- @param {string} value - Example: "janedoe"
- @returns {void} - formValues state updated
  \*/
  const handleFieldChange = (field, value) => { ... }

/\*_ @description: Product gallery with thumbnail selection logic. _/
const ProductGallery = ({ image, thumbnails }) => { ... }
