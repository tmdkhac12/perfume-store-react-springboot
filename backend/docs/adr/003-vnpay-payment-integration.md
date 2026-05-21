# ADR 003: Tích hợp cổng thanh toán trực tuyến VNPay

- **Trạng thái:** Đã chấp nhận (Accepted)
- **Ngày:** 21-05-2026

## Ngữ cảnh (Context)

### Vấn đề hiện tại
Trước đây, hệ thống Perfume Store chỉ hỗ trợ hình thức thanh toán khi nhận hàng (COD) hoặc chuyển khoản ngân hàng thủ công. Điều này mang lại một số hạn chế lớn:
1. **Rủi ro hoàn đơn (bom hàng):** COD không ràng buộc khách hàng trả tiền trước, tăng tỷ lệ đơn hàng bị từ chối nhận khi giao.
2. **Khó kiểm soát đối soát:** Chuyển khoản thủ công yêu cầu quản trị viên kiểm tra biến động số dư ngân hàng và đối chiếu thủ công bằng mắt, dễ xảy ra sai sót và mất thời gian khi lượng đơn hàng lớn.
3. **Thiếu linh hoạt:** Khách hàng không thể sử dụng các hình thức thanh toán hiện đại như ví điện tử, quét mã QR ngân hàng (VietQR) nhanh hoặc thẻ tín dụng quốc tế (Visa/Mastercard/JCB) để thanh toán trực tuyến.

### Luồng hoạt động cũ (Old Flow)
1. Người dùng chọn sản phẩm -> Điền thông tin giao hàng -> Chọn hình thức thanh toán COD.
2. Đơn hàng được tạo trên hệ thống với trạng thái thanh toán mặc định là `Pending` và phương thức giao hàng là `COD`.
3. Đơn hàng được đóng gói và giao đi. Shipper trực tiếp thu tiền mặt từ khách hàng và đối soát lại với cửa hàng sau đó.

### Use Case thực tế
Một khách hàng muốn mua một chai nước hoa cao cấp trị giá 3.500.000 VNĐ. Khách hàng này muốn sử dụng thẻ tín dụng Visa để thanh toán trực tuyến nhằm nhận điểm thưởng hoàn tiền từ ngân hàng phát hành và không muốn mang theo nhiều tiền mặt khi shipper giao tới. Đồng thời, chủ cửa hàng cũng muốn nhận thanh toán trước cho các đơn hàng giá trị cao để chắc chắn khách hàng sẽ nhận hàng.

### Yêu cầu mới
Chúng ta cần tích hợp cổng thanh toán trực tuyến VNPay với các yêu cầu sau:
1. Tạo link thanh toán động dựa trên mã đơn hàng và số tiền thanh toán thực tế của hóa đơn.
2. Sử dụng thuật toán ký số an toàn `HMAC-SHA512` để chống gian lận và giả mạo tham số.
3. Xử lý các luồng callback bao gồm:
   - **Return URL:** Trình duyệt khách hàng tự động chuyển hướng về để hiển thị nhanh kết quả thanh toán trên giao diện Frontend.
   - **IPN (Instant Payment Notification):** Kênh liên lạc an toàn server-to-server để VNPay gửi kết quả cập nhật trạng thái đơn hàng chính thức vào cơ sở dữ liệu của chúng ta.
4. Đảm bảo mã hóa URL ký số tuân thủ nghiêm ngặt chuẩn định dạng UTF-8 và thay thế ký tự dấu cộng `+` thành `%20` khi băm chữ ký.

## Quyết định (Decision)

Chúng ta quyết định tích hợp VNPay API phiên bản `2.1.0` làm giải pháp xử lý thanh toán trực tuyến chính cho phương thức chuyển khoản (`PaymentMethod.Transfer`):

1. **Sinh URL thanh toán động:** Khi tạo hóa đơn (`createInvoice` trong `InvoiceService`), nếu phương thức thanh toán là `Transfer`, hệ thống tự động gọi dịch vụ `VNPayService` để tạo liên kết thanh toán VNPay Sandbox/Production. Link này được đính kèm vào trường `checkoutUrl` của response trả về cho Frontend.
2. **Standardization mã hóa chữ ký:** Sử dụng lớp tiện ích `VNPayUtil` để thực hiện băm HMAC-SHA512. Để loại bỏ hoàn toàn các lỗi lệch chữ ký ("Invalid Signature"):
   - Sắp xếp tất cả các tham số theo bảng chữ cái từ A-Z sử dụng `Collections.sort`.
   - Mã hóa giá trị tham số bằng `java.net.URLEncoder.encode` với charset `StandardCharsets.US_ASCII`.
   - Đảm bảo tính đồng nhất giữa chuỗi dữ liệu băm và chuỗi query trong URL.
   - Sử dụng `StringBuilder` hoặc `String.join` để kết nối các cặp khóa-giá trị một cách chính xác.
3. **Tách biệt Return URL và IPN:**
   - Cung cấp REST endpoint `GET /api/v1/payment/vnpay-return` làm nơi Frontend gọi điện để kiểm tra chữ ký và hiển thị kết quả trực quan cho người dùng.
   - Cung cấp REST endpoint `GET /api/v1/payment/vnpay-ipn` làm Webhook bảo mật, đối soát chéo số tiền hóa đơn thực tế và số tiền VNPay báo thu, sau đó cập nhật trực tiếp `paymentStatus` trong DB thành `Paid` hoặc `Failed`.

## Hệ quả (Consequences)

### Tích cực
- **Trải nghiệm mua sắm chuyên nghiệp (UX):** Khách hàng có thể quét mã VietQR qua App ngân hàng hoặc quẹt thẻ tín dụng thanh toán ngay lập tức.
- **Tự động hóa hoàn toàn luồng thanh toán:** Trạng thái hóa đơn được tự động chuyển sang `Paid` ngay khi VNPay xác nhận giao dịch thành công qua kênh IPN, giảm tải công việc đối soát thủ công của Admin.
- **An toàn bảo mật:** Chữ ký số HMAC-SHA512 và cơ chế kiểm tra IPN chặt chẽ (đối chiếu số tiền, kiểm tra trạng thái hóa đơn hiện tại) giúp ngăn chặn triệt để hành vi giả mạo kết quả thanh toán.

### Tiêu cực
- **Phụ thuộc bên thứ ba:** Nếu máy chủ VNPay Sandbox hoặc Production gặp sự cố, luồng thanh toán online của hệ thống sẽ bị gián đoạn.
- **Bảo mật key:** Cần quản lý cấu hình bảo mật `vnp_TmnCode` và `vnp_HashSecret` cẩn thận trong biến môi trường hệ thống (.env), không được đẩy lộ lên các kho chứa mã nguồn công khai.
