# Kế hoạch triển khai - Auth Guard cho các Route Tài khoản và Thanh toán (ĐÃ HOÀN THÀNH)

Kế hoạch này phác thảo các bước để triển khai một lớp bảo vệ xác thực (authentication guard) cho các route `/account/**` và `/checkout`. Ngoài ra, chúng ta sẽ cập nhật logic điều hướng ở Header để tối ưu trải nghiệm người dùng.

## Mục tiêu
- Bảo vệ các route `/account/**` và `/checkout` khỏi truy cập trái phép. (X)
- Điều hướng người dùng chưa xác thực về trang `/login` kèm thông báo lỗi. (X)
- Tự động chuyển hướng người dùng từ Header đến `/account/profile` nếu đã đăng nhập, hoặc `/login` nếu chưa. (X)

## Các giai đoạn thực hiện

### Giai đoạn 1: Thành phần Bảo vệ Xác thực (Auth Guard Component) - [HOÀN THÀNH]
Tạo một component `AuthGuard` có thể tái sử dụng để xử lý logic bảo vệ.

- **Các nhiệm vụ**:
    - [x] Tạo `src/components/auth/AuthGuard.jsx`.
    - [x] Sử dụng hàm `getAuthToken()` từ `src/services/authStorage.js`.
    - [x] Triển khai logic:
        - Nếu không có token hợp lệ: Chuyển hướng người dùng về trang `/login` kèm `state: { message: 'Vui lòng đăng nhập để tiếp tục.', from: location.pathname }`.
        - Nếu token hợp lệ: Hiển thị (render) `children` (Outlet hoặc Page).

### Giai đoạn 2: Cập nhật trang Login để hiển thị Toast - [HOÀN THÀNH]
Đảm bảo trang `LoginPage` có thể bắt thông tin từ `location.state` để hiển thị `ToastNotification`.

- **Các nhiệm vụ**:
    - [x] Chỉnh sửa `src/pages/LoginPage.jsx` để sử dụng `useLocation`.
    - [x] Hiển thị `ToastNotification` nếu `location.state.message` tồn tại.
    - [x] Xóa state sau khi hiển thị để tránh lặp lại thông báo khi refresh.

### Giai đoạn 3: Bảo vệ Route trong Cấu hình - [HOÀN THÀNH]
Áp dụng `AuthGuard` cho cả `/account` và `/checkout`.

- **Các nhiệm vụ**:
    - [x] Cập nhật `src/config/routes.jsx`.
    - [x] Bao bọc `accountRouteChildren` bằng `AuthGuard`.
    - [x] Bảo vệ `checkout` route bằng `AuthGuard`.

### Giai đoạn 4: Cập nhật Navigation ở Header - [HOÀN THÀNH]
Thay đổi link biểu tượng "person" để điều hướng thông minh.

- **Các nhiệm vụ**:
    - [x] Chỉnh sửa `src/components/base/MainHeader.jsx`.
    - [x] Sử dụng `getAuthToken()` để kiểm tra trạng thái đăng nhập.
    - [x] Cập nhật link biểu tượng "person" để trỏ đến `/account/profile` hoặc `/login`.
