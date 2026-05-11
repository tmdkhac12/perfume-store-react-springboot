# ADR 001: Xử lý lỗi xác thực JWT cho các Endpoint công khai

- **Trạng thái:** Đã chấp nhận (Accepted)
- **Ngày:** 11-05-2026

## Ngữ cảnh (Context)

### Vấn đề hiện tại
Trong cấu hình bảo mật cũ, `JwtAuthenticationFilter` được thiết kế để kiểm tra và xác thực token ngay khi nó xuất hiện trong request header. Nếu token không hợp lệ hoặc hết hạn, filter sẽ chặn đứng yêu cầu và trả về lỗi `401 Unauthorized` ngay lập tức.

### Luồng hoạt động cũ (Old Flow)
1. Request gửi đến (ví dụ: `GET /api/v1/brands`).
2. `JwtAuthenticationFilter` lấy token từ header.
3. Filter gọi `jwtService.extractAllClaims(token)`.
4. Nếu token hết hạn, `ExpiredJwtException` bị ném ra.
5. Filter bắt exception này và trả về `401 Unauthorized` qua `HttpServletResponse`.
6. **Hệ quả:** Request bị dừng lại hoàn toàn, không bao giờ chạm tới tầng Authorization của Spring Security.
Nếu kiểm tra thất bại, filter **không** dừng request.

### Use Case thực tế
Người dùng đã đăng nhập vào hệ thống từ vài ngày trước. Trình duyệt của họ vẫn lưu token JWT đã hết hạn trong LocalStorage/Cookie. Khi người dùng quay lại trang chủ của cửa hàng (ví dụ: xem danh sách nhãn hàng tại `/api/v1/brands`), trình duyệt tự động đính kèm token cũ này vào header.

- **Mong muốn:** Người dùng vẫn phải xem được danh sách nhãn hàng vì đây là endpoint công khai (`permitAll()`).
- **Thực tế cũ:** Người dùng bị lỗi 401 và không xem được gì, gây trải nghiệm rất tệ.

### Yêu cầu mới
Chúng ta cần một cơ chế linh hoạt:
1. Cho phép truy cập vào các endpoint công khai ngay cả khi có token "rác" (hết hạn/sai định dạng).
2. Phải trả về lỗi 401 kèm thông báo rõ ràng cho các endpoint yêu cầu bảo mật để Frontend biết đường bắt người dùng đăng nhập lại.

## Quyết định (Decision)
Chúng ta quyết định tách biệt giữa **Kiểm tra Token (Token Validation)** và **Bắt buộc Xác thực (Authentication Enforcement)**:

1. **Trong `JwtAuthenticationFilter`**: Nếu kiểm tra token thất bại, chúng ta chỉ ghi log và lưu thông báo vào attribute của request (`jwt_exception_message`). Sau đó, cho phép request tiếp tục đi qua chuỗi filter.
2. **Trong `SecurityConfig`**: Cấu hình `AuthenticationEntryPoint` tùy chỉnh để chỉ xử lý lỗi khi người dùng cố tình truy cập vào tài nguyên bị cấm mà không có xác thực hợp lệ.
3. **Trong `AuthenticationEntryPoint`**: Kiểm tra attribute từ bước 1 để trả về lỗi 401 với nội dung cụ thể (ví dụ: "Token expired").

## Hệ quả (Consequences)
- **Tích cực**: 
    - Các endpoint công khai hiện có thể truy cập được bất kể trạng thái của token.
    - Frontend có thể phân biệt giữa "Thiếu Token" và "Token hết hạn" để cải thiện trải nghiệm người dùng (UX).
- **Tiêu cực**:
    - Có một sự phụ thuộc nhỏ vào khóa chuỗi (string key) `"jwt_exception_message"` giữa filter và entry point.
