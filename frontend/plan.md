# Kế hoạch Thực hiện Phase 4.3 - Account Orders

## 📌 Mục tiêu
Tích hợp API lịch sử đơn hàng và chi tiết đơn hàng cho người dùng, đảm bảo hiển thị đầy đủ thông tin sản phẩm và trạng thái thanh toán.

## 🛠 Yêu cầu Backend bổ sung/cập nhật API

### 1. Endpoint: `GET /api/v1/invoices/me`
**Mô tả:** Lấy danh sách đơn hàng có phân trang của người dùng hiện tại (dựa trên Token).

**Cấu trúc Response mong muốn:**
```json
{
  "timestamp": "2024-04-29T10:00:00Z",
  "status": 200,
  "path": "/api/v1/invoices/me",
  "data": {
    "content": [
      {
        "id": 1,
        "createdAt": "2024-04-29T10:00:00",
        "total": 5000000.00,
        "deliveryStatus": "DELIVERED",
        "itemPreviews": [
          "http://res.cloudinary.com/.../img1.jpg",
          "http://res.cloudinary.com/.../img2.jpg"
        ],
        "totalItems": 3
      }
    ],
    "page": 1,
    "size": 8,
    "totalElements": 10,
    "totalPages": 2
  },
  "message": "Get my invoices successfully",
  "error": null
}
```

### 2. Endpoint: `GET /api/v1/invoices/{id}`
**Mô tả:** Lấy chi tiết một đơn hàng cụ thể (Yêu cầu bổ sung thêm các trường thông tin).

**Cấu trúc Response mong muốn:**
```json
{
  "timestamp": "2024-04-29T10:00:00Z",
  "status": 200,
  "path": "/api/v1/invoices/1",
  "data": {
    "id": 1,
    "createdAt": "2024-04-29T10:00:00",
    "receiverName": "Nguyen Van A",
    "phoneNumber": "0987654321",
    "shippingAddress": "123 Ly Tu Trong, Q1, HCM",
    "deliveryStatus": "DELIVERED",
    "paymentMethod": "Credit Card ending in 4242",
    "subtotal": 4800000.00,
    "shippingFee": 150000.00,
    "tax": 50000.00,
    "total": 5000000.00,
    "invoiceDetails": [
      {
        "perfumeName": "Bleu de Chanel",
        "volumeName": "100.0",
        "concentration": "EDP",
        "quantity": 1,
        "buyPrice": 3000000.00,
        "image": "http://res.cloudinary.com/.../img1.jpg"
      }
    ]
  },
  "message": "Invoice retrieved",
  "error": null
}
```

---

## 🚀 Kế hoạch thực hiện Frontend

- [ ] **Bước 1: Tích hợp Danh sách đơn hàng**
    - Gọi API `GET /api/v1/invoices/me` trong `AccountOrdersPage`.
    - Map dữ liệu vào `OrderHistoryList` và `OrderHistoryCard`.
    - Xử lý phân trang (nếu danh sách dài).

- [ ] **Bước 2: Tích hợp Chi tiết đơn hàng (Modal)**
    - Cập nhật `OrderDetailsModal` để nhận ID đơn hàng.
    - Gọi API `GET /api/v1/invoices/{id}` khi mở modal.
    - Hiển thị đầy đủ thông tin: Địa chỉ, Thanh toán, Danh sách sản phẩm (có ảnh và nồng độ).

- [ ] **Bước 3: Trạng thái UI & Validation**
    - Hiển thị Skeleton/Loading khi đang tải dữ liệu.
    - Hiển thị UI "Empty" khi người dùng chưa có đơn hàng nào.
    - Xử lý lỗi (Error boundary) khi API thất bại.

## ✅ Tiêu chí hoàn thành
- Người dùng xem được danh sách đơn hàng cá nhân với ảnh xem trước.
- Modal chi tiết hiển thị chính xác và đầy đủ các thông tin từ Backend.
- Không còn dữ liệu mẫu (mock data) trong các component liên quan.
