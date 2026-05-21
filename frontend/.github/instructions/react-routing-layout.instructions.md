---
applyTo: 'src/{config,layouts,pages}/**/*.{js,jsx}'
description: 'Dùng khi chỉnh sửa React routes, layouts và các route-level pages. Đảm bảo khả năng truy cập route đầy đủ, tính nhất quán layout-shell và tính toàn vẹn điều hướng.'
---

# Quy Tắc React Routing Và Layout

## Quy Ước Route

- Giữ route paths đồng bộ với kế hoạch React refactor trong `tasks.md`.
- Duy trì khả năng truy cập đầy đủ cho các bề mặt Public, Auth, Account và Admin.
- Bảo toàn mục đích và nhãn route hiện tại trừ khi có yêu cầu rõ ràng.

## Quy Tắc Layout Shell

- Sử dụng shared layout shells cho từng bề mặt:
  - Public -> `MainLayout`
  - Auth -> `AuthLayout`
  - Account -> `AccountLayout`
  - Admin -> `AdminLayout`
- Giữ trách nhiệm shell dùng chung trong layout components và nội dung theo route trong page components.
- Tránh lặp lại các khối navigation giữa các route page khi layout shell đã cung cấp sẵn.

## Tính Toàn Vẹn Điều Hướng

- Sử dụng `Link`/`NavLink` cho điều hướng route.
- Không dùng placeholder links như `href="#"` trong các React routes đã migrate.
- Giữ route transitions và hành vi active-state nhất quán với pattern hiện có.

## Kiểm Tra Tính Nhất Quán

- Đảm bảo không tạo dead-end navigation cho các route trong phạm vi.
- Bảo toàn hành vi responsive và nhịp điệu thị giác của các khối header/navigation.
- Giữ cách đặt tên và cấu trúc nhất quán với trách nhiệm hiện có của `src/config/route-map.js` và `src/config/routes.jsx`.
