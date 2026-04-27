# AGENTS.md

1. **Tổng quan dự án:** Dự án này là gì, làm cho ai, mục đích gì.
- Dự án này là một nguyên mẫu frontend tĩnh cho trải nghiệm thương mại điện tử nước hoa, dành cho người mua hàng, người dùng tài khoản và nhóm vận hành admin.
- Mục tiêu chính là xác thực các luồng UI/UX trước khi tích hợp backend, bao gồm duyệt catalog, chi tiết sản phẩm, giỏ hàng/thanh toán, trang tài khoản người dùng và các màn hình quản trị.
- Các điểm vào chính:
  - Trang đích Public: [index.html](index.html)
  - Store và trang sản phẩm: [pages/shop.html](pages/shop.html), [pages/product-details.html](pages/product-details.html)
  - Giỏ hàng và thanh toán: [pages/cart.html](pages/cart.html), [pages/checkout.html](pages/checkout.html)
  - Khu vực người dùng: [pages/user-profile.html](pages/user-profile.html), [pages/user-orders.html](pages/user-orders.html), [pages/user-address.html](pages/user-address.html), [pages/user-security.html](pages/user-security.html)
  - Khu vực admin: [pages/admin-overview.html](pages/admin-overview.html), [pages/admin-products.html](pages/admin-products.html), [pages/admin-brands.html](pages/admin-brands.html), [pages/admin-invoices.html](pages/admin-invoices.html), [pages/admin-notes.html](pages/admin-notes.html), [pages/admin-users.html](pages/admin-users.html), [pages/admin-volumes.html](pages/admin-volumes.html)

2. **Ngăn xếp công nghệ.**
- Core: các trang HTML5 tĩnh với Tailwind utility-first classes.
- Styling: Tailwind CSS qua CDN (`https://cdn.tailwindcss.com?plugins=forms,container-queries`) với các khối `tailwind.config` inline theo từng trang.
- Typography và icon: Google Fonts (Manrope, Noto Serif) và Material Symbols Outlined.
- Hành vi: các inline JavaScript handler gọn nhẹ cho tương tác UI đơn giản (mở/đóng modal, toggle cục bộ).
- Trạng thái công cụ: không có `package.json`, không có bundler, không có test runner, không có build pipeline trong thư mục frontend này.
- Lệnh xem trước local:
  - `python -m http.server 8000 -d d:\Documents\Projects\web\Perfume_Store\frontend`

- Cấu trúc React app được đề xuất:
  /src
  ├── /assets         # Tài nguyên tĩnh dùng chung (hình ảnh, font, style toàn cục)
  ├── /components     # UI component dùng chung, tổng quát (Buttons, Inputs, Modals)
  ├── /config         # Cấu hình toàn cục (biến môi trường, hằng số)
  ├── /context        # React Context toàn cục cho state xuyên suốt
  ├── /features       # Module tính năng theo domain
  │   └── /auth       # Ví dụ: tính năng Authentication
  │       ├── /api    # API calls/hooks theo tính năng
  │       ├── /components # Component đặc thù của tính năng này
  │       ├── /hooks  # Custom hooks cho logic tính năng
  │       ├── /types  # Định nghĩa TypeScript cho dữ liệu tính năng
  │       └── index.ts # API công khai cho tính năng (chỉ export phần cần thiết)
  ├── /hooks          # Hooks tái sử dụng toàn cục
  ├── /layouts        # Layout trang (MainLayout, AuthLayout, Sidebar)
  ├── /lib            # Lớp facade cho thư viện bên thứ ba (axios, react-query)
  ├── /pages          # Route component ghép các feature thành trang hoàn chỉnh
  ├── /services       # API client dùng chung hoặc service logic nghiệp vụ
  ├── /types          # Interface và type TypeScript toàn cục
  └── /utils          # Utility function thuần (formatters, validators)

3. **Quy tắc thiết kế:** Màu sắc chủ đạo, font chữ, style tổng thể.
- Giữ định hướng luxury-minimal hiện có: khoảng trắng sạch, tương phản tiết chế, chuyển động tinh tế, và các phần tử bo góc.
- Hướng token màu chủ đạo (đã triển khai xuyên suốt các trang): neutral đậm primary (`#0b0c0c`/`#212529`), nền neutral sáng (`#f8f9fa`, `#ffffff`), xám viền nhẹ (`#c4c7c7`, `#ced4da`).
- Hệ thống typography:
  - Phần tiêu đề và điểm nhấn thương hiệu: `Noto Serif`
  - Nội dung thân bài, nhãn và văn bản tiện ích: `Manrope`
- Tiêu chuẩn bố cục UI:
  - Ưu tiên Tailwind utility classes, tránh các khối custom CSS lớn trừ khi mức lặp lại đủ lớn.
  - Bảo toàn hành vi responsive theo pattern hiện có (`grid-cols-1` tới các breakpoint `md`/`lg`).
  - Bảo toàn tương tác mượt (hover transitions, hiệu ứng scale/opacity nhẹ, sticky summary/sidebar tại nơi đã dùng).
- Quy tắc nhất quán thương hiệu: không thêm tên thương hiệu khác; đồng bộ nội dung UI mới với định hướng thương hiệu đã có trong trang được chỉnh sửa.

4. **Quy tắc bắt buộc:** Những thứ agents không được làm hoặc phải làm.
- Bắt buộc đọc và tuân thủ [.github/copilot-instructions.md](.github/copilot-instructions.md) và [docs/copilot-code.md](docs/copilot-code.md) trước các thay đổi lớn.
- Bắt buộc trao đổi giải thích với người dùng bằng tiếng Việt, trong khi source code/comment/UI strings được tạo ra phải giữ bằng tiếng Anh.
- Bắt buộc giữ giả định static-first: không khẳng định hành vi backend đã hoàn chỉnh nếu chưa được triển khai rõ ràng.
- Không được thêm framework/build system/package manifest mới trừ khi người dùng yêu cầu rõ ràng.
- Bắt buộc giữ path reference và navigation link hợp lệ theo cấu trúc thư mục này (`index.html` ở root, các trang khác trong `pages/`).
- Ưu tiên liên kết tới tài liệu hiện có thay vì sao chép dài dòng vào file rule mới.
- Bắt buộc cập nhật nhất quán các file quy tắc agent khi quy trình thay đổi (tối thiểu là file này và các file instruction liên quan).

5. **Quy trình làm việc:** Cách làm việc trong dự án này, sau mỗi thay đổi lớn thì làm gì.
1. Bắt đầu bằng cách rà soát [AGENTS.md](AGENTS.md), [.github/copilot-instructions.md](.github/copilot-instructions.md), và [docs/copilot-code.md](docs/copilot-code.md).
2. Xác định trước khu vực bị ảnh hưởng (Public, User, hoặc Admin) và liệt kê chính xác các file trước khi chỉnh sửa.
3. Tái sử dụng token Tailwind, typography, spacing và pattern tương tác hiện có từ [index.html](index.html) và trang gần nhất liên quan.
4. Triển khai bộ thay đổi nhỏ nhất nhưng an toàn; tránh refactor không liên quan.
5. Sau mỗi thay đổi lớn, chạy vòng kiểm tra chéo:
   - So sánh kết quả với hướng dẫn hiện có và các trang lân cận để đảm bảo nhất quán.
   - Xác minh hành vi layout trên desktop và mobile.
   - Xác minh tính nhất quán thị giác (color tokens, fonts, nhịp điệu component, tên thương hiệu).
   - Xác minh tính toàn vẹn của link và tương tác (không có `href` hỏng, không có trigger chết).
6. Nếu phát hiện sai lệch, tiếp tục tinh chỉnh cho đến khi kết quả khớp hoàn toàn với yêu cầu và quy ước dự án.
7. Khi bàn giao phiên làm việc, ghi rõ đã hoàn thành gì, bước tiếp theo là gì, và các quyết định quan trọng trong file này hoặc trong ghi chú dự án được tham chiếu.

## 6. Bàn Giao Phiên Làm Việc — 2026-04-27 (Tổng Kết Đến Hiện Tại)

### Đã Hoàn Thành Trong Dự Án Đến Thời Điểm Này
- Hoàn thành migration UI-only cho toàn bộ bề mặt Public, Auth, Account và Admin theo route map trong `tasks.md`.
- Hoàn thành Phase 5 (Auth/User UI Migration):
  - Login/Register.
  - User Account pages: Profile, Orders, Address, Security.
- Hoàn thành Phase 6 (Admin UI Migration):
  - Admin pages: Overview, Products, Brands, Invoices, Notes, Users, Volumes.
  - Tách các pattern admin dùng chung vào nhóm component tái sử dụng trong `src/features/admin/components`.
- Chuẩn hóa layout shell theo từng bề mặt route và giữ nguyên nguyên tắc parity-first khi migrate từ static HTML sang React.
- Cập nhật bộ tài liệu hướng dẫn sang tiếng Việt theo rule hiện hành:
  - `.github/copilot-instructions.md`
  - `.github/instructions/react-core.instructions.md`
  - `.github/instructions/react-routing-layout.instructions.md`
  - `AGENTS.md`

### Trạng Thái Hiện Tại Theo Khu Vực
- Public routes: đã đạt parity UI mức cao với các trang static tương ứng.
- Auth routes: đã migrate UI đầy đủ theo phạm vi Phase 5.
- Account routes: đã migrate UI đầy đủ theo phạm vi Phase 5.
- Admin routes: đã migrate UI đầy đủ theo phạm vi Phase 6.
- Router wiring: đầy đủ các nhóm route Public/Auth/Account/Admin, không còn placeholder admin routes.

### Kết Quả Kiểm Tra Gần Nhất
- `npm run lint`: pass.
- `npm run test -- --run`: pass toàn bộ route smoke tests (18 tests).
- Diagnostics trên các file đã chỉnh sửa trong phạm vi phase migration: không còn lỗi compile tại thời điểm chốt.

### Quyết Định Quan Trọng Và Lý Do
- Giữ chiến lược parity-first xuyên suốt (parity hành vi và giao diện trước, tối ưu hóa sau).
  - Lý do: giảm drift so với baseline static, giúp review trực quan và ổn định.
- Chỉ dùng ngoại lệ migration React khi cần cho đúng ngữ nghĩa framework:
  - Anchor route chuyển sang `Link`/`NavLink`.
  - Inline handlers chuyển sang state/events trong React.
  - Lý do: tránh quay lại script inline và giữ tính nhất quán của kiến trúc React.
- Giữ phạm vi thay đổi nhỏ, đúng yêu cầu từng phase.
  - Lý do: hạn chế regression và giảm nhiễu khi review.

### Hạng Mục Còn Lại (Theo Kế Hoạch)
- Phase 7 (UI Quality Gates):
  - Xác minh route reachability end-to-end.
  - Xác minh visual parity desktop/mobile theo baseline.
  - Chốt lại lint/test/build và lập quality report.
- Phase 8 (Legacy Cleanup & Cutover):
  - Thực hiện sau khi sign-off; dọn luồng static legacy khỏi workflow chính, hoàn tất 404 behavior và cập nhật tài liệu liên quan.

### Lưu Ý Khi Tiếp Tục
- Dự án hiện vẫn bám định hướng UI-only: chưa triển khai business logic/API/state orchestration.
- Khi mở phase logic backend integration, cần kế hoạch riêng để tránh phá vỡ parity UI đã hoàn thành.