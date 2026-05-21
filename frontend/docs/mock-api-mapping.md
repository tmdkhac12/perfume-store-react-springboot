# Mapping UI <-> API

## Mục tiêu

- Làm rõ mối liên kết giữa giao diện người dùng (UI) và các điểm cuối (endpoint) của Backend dựa trên tài liệu `api-list.md`.
- Sử dụng để lựa chọn ưu tiên khi tích hợp API thật vào từng trang cụ thể.

## Công khai (Public)

- **Trang Cửa hàng (ShopPage)** -> `GET /api/v1/brands`, `GET /api/v1/perfumes` (Phân trang, bộ lọc, sắp xếp).
- **Trang Chi tiết Sản phẩm (ProductDetailsPage)** -> `GET /api/v1/perfumes/{id}`.

## Xác thực (Auth)

- **Trang Đăng nhập (LoginPage)** -> `POST /api/v1/auth/login`
- **Trang Đăng ký (RegisterPage)** -> `POST /api/v1/auth/register`
- **Kiểm tra Token (Guard)** -> `POST /api/v1/auth/token`

## Tài khoản (Account)

- **Trang Hồ sơ Cá nhân (AccountProfilePage)** -> `GET /api/v1/users/me`
- **Trang Địa chỉ (AccountAddressPage)** -> `GET/POST /api/v1/users/me/addresses`
- **Trang Đơn hàng (AccountOrdersPage)** -> _(Chưa có endpoint danh sách theo người dùng trong api-list.md)_.

## Giỏ hàng + Thanh toán (Cart + Checkout)

- **Trang Thanh toán (CheckoutPage)** -> `POST /api/v1/invoices`

## Quản trị viên (Admin)

- **Trang Quản lý Thương hiệu (AdminBrandsPage)** -> CRUD `/api/v1/brands`
- **Trang Quản lý Hương thơm (AdminNotesPage)** -> CRUD `/api/v1/notes`
- **Trang Quản lý Dung tích (AdminVolumesPage)** -> CRUD `/api/v1/volumes`
- **Trang Quản lý Sản phẩm (AdminProductsPage)** -> CRUD `/api/v1/perfumes`
- **Trang Quản lý Người dùng (AdminUsersPage)** -> `GET/POST/PUT /api/v1/admin/users`, `POST /api/v1/admin/users/{id}/reset-password`
- **Trang Quản lý Hóa đơn (AdminInvoicesPage)** -> `GET /api/v1/invoices`, `GET /api/v1/invoices/{id}`, `PATCH /api/v1/invoices/{id}/status`

## Lưu ý

- Tất cả phản hồi (response) phải tuân thủ cấu trúc `ApiResponse` và `PageResponse`.
- Base URL cấu hình qua biến môi trường `VITE_API_BASE_URL` và `VITE_API_VERSION`.
