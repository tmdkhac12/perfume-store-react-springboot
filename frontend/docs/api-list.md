# Perfume Store API Documentation

Tài liệu này cung cấp danh sách các endpoints, cấu trúc request/response cho hệ thống Perfume Store Backend.

## 📌 Thông tin chung

- **Base URL:** `http://localhost:8080` (Development)
- **API Version:** `v1`
- **Format:** `JSON`
- **Authentication:** Bearer Token (JWT) hoặc OAuth2 Cookie.

---

## 🏗 Cấu trúc Response chuẩn

Tất cả các API đều trả về dữ liệu theo định dạng envelope `ApiResponse`:

```json
{
  "timestamp": "2024-04-29T10:00:00Z",
  "status": 200,
  "path": "/api/v1/...",
  "data": { ... }, // Dữ liệu trả về (có thể là Object, Array hoặc null)
  "message": "Thông báo thành công",
  "error": null    // Chỉ có giá trị khi có lỗi (String)
}
```

### Phân trang (PageResponse)
Đối với các danh sách có phân trang, phần `data` sẽ có cấu trúc:

```json
{
  "content": [ ... ], // Danh sách item
  "page": 0,          // Trang hiện tại
  "size": 10,         // Số lượng item mỗi trang
  "totalElements": 100,
  "totalPages": 10
}
```

---

## ❌ Các mã lỗi thường gặp

| Status Code | Ý nghĩa | Mô tả |
| :--- | :--- | :--- |
| **200** | OK | Truy vấn thành công. |
| **201** | Created | Tạo mới dữ liệu thành công. |
| **400** | Bad Request | Dữ liệu đầu vào không hợp lệ (Validation fails, logic violation). |
| **401** | Unauthorized | Token không hợp lệ hoặc hết hạn. |
| **403** | Forbidden | Không có quyền truy cập (Role không khớp). |
| **404** | Not Found | Không tìm thấy tài nguyên yêu cầu. |
| **409** | Conflict | Dữ liệu đã tồn tại (Duplicate entry) hoặc vi phạm ràng buộc database. |
| **500** | Internal Error | Lỗi hệ thống từ phía server. |


---

## 🔑 Authentication

Hầu hết các endpoints đều yêu cầu Header:
`Authorization: Bearer <your_jwt_token>`

---

## 🔐 Auth Module

Các endpoints liên quan đến xác thực và đăng ký.

### 1. Đăng nhập
- **Endpoint:** `POST /api/v1/auth/login`
- **Auth:** None
- **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/auth/login",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "Login successfully",
    "error": null
  }
  ```

### 2. Đăng ký
- **Endpoint:** `POST /api/v1/auth/register`
- **Auth:** None
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/auth/register",
    "data": true,
    "message": "Register successfully",
    "error": null
  }
  ```

### 3. Kiểm tra Token
- **Endpoint:** `POST /api/v1/auth/token`
- **Auth:** Bearer Token
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/auth/token",
    "data": true,
    "message": "Valid Token",
    "error": null
  }
  ```

### 4. Đăng nhập qua Google (OAuth2)
- **Endpoint:** `GET /oauth2/authorization/google`
- **Auth:** None
- **Mô tả:** Chuyển hướng người dùng đến trang đăng nhập của Google.
- **Xử lý sau khi thành công:**
  - Hệ thống tự động tạo JWT Token và lưu vào Cookie `jwt_token` (HttpOnly).
  - Người dùng được chuyển hướng về trang chủ hoặc endpoint mặc định.

---

## 🏷 Brand Module

Quản lý danh mục thương hiệu nước hoa.

### 1. Lấy danh sách thương hiệu
- **Endpoint:** `GET /api/v1/brands`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/brands",
    "data": [
      {
        "id": 1,
        "name": "Chanel",
        "hide": false
      },
      {
        "id": 2,
        "name": "Dior",
        "hide": false
      }
    ],
    "message": "Get all brands successfully",
    "error": null
  }
  ```

### 2. Chi tiết thương hiệu
- **Endpoint:** `GET /api/v1/brands/{id}`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/brands/1",
    "data": {
      "id": 1,
      "name": "Chanel",
      "hide": false
    },
    "message": "Brand retrieved",
    "error": null
  }
  ```

### 3. Tạo thương hiệu (Admin)
- **Endpoint:** `POST /api/v1/brands`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "name": "Gucci",
    "hide": false
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 201,
    "path": "/api/v1/brands",
    "data": {
      "id": 3,
      "name": "Gucci",
      "hide": false
    },
    "message": "Brand Created",
    "error": null
  }
  ```

### 4. Cập nhật thương hiệu (Admin)
- **Endpoint:** `PUT /api/v1/brands/{id}`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "name": "Gucci Revised",
    "hide": true
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/brands/3",
    "data": {
      "id": 3,
      "name": "Gucci Revised",
      "hide": true
    },
    "message": "Brand Updated",
    "error": null
  }
  ```

### 5. Xóa thương hiệu (Admin)
- **Endpoint:** `DELETE /api/v1/brands/{id}`
- **Auth:** Bearer Token (Admin)
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/brands/3",
    "data": null,
    "message": "Brand Deleted",
    "error": null
  }
  ```

---

## 📝 Note Module

Quản lý danh mục các tầng hương (Top, Heart, Base notes).

### 1. Lấy danh sách mùi hương
- **Endpoint:** `GET /api/v1/notes`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/notes",
    "data": [
      {
        "id": 1,
        "name": "Vanilla",
        "hide": false
      }
    ],
    "message": "Get all notes successfully",
    "error": null
  }
  ```

### 2. Chi tiết mùi hương
- **Endpoint:** `GET /api/v1/notes/{id}`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/notes/1",
    "data": {
      "id": 1,
      "name": "Vanilla",
      "hide": false
    },
    "message": "Note retrieved",
    "error": null
  }
  ```

### 3. Tạo mùi hương (Admin)
- **Endpoint:** `POST /api/v1/notes`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "name": "Bergamot",
    "hide": false
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 201,
    "path": "/api/v1/notes",
    "data": {
      "id": 2,
      "name": "Bergamot",
      "hide": false
    },
    "message": "Note created",
    "error": null
  }
  ```

### 4. Cập nhật mùi hương (Admin)
- **Endpoint:** `PUT /api/v1/notes/{id}`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "name": "Bergamot Updated",
    "hide": true
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/notes/2",
    "data": {
      "id": 2,
      "name": "Bergamot Updated",
      "hide": true
    },
    "message": "Note updated",
    "error": null
  }
  ```

### 5. Xóa mùi hương (Admin)
- **Endpoint:** `DELETE /api/v1/notes/{id}`
- **Auth:** Bearer Token (Admin)
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/notes/2",
    "data": null,
    "message": "Note deleted",
    "error": null
  }
  ```

---

## 📏 Volume Module

Quản lý các loại dung tích nước hoa.

### 1. Lấy danh sách dung tích
- **Endpoint:** `GET /api/v1/volumes`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/volumes",
    "data": [
      {
        "id": 1,
        "volume": 100.0,
        "hide": false
      }
    ],
    "message": "Get all volumes successfully",
    "error": null
  }
  ```

### 2. Chi tiết dung tích
- **Endpoint:** `GET /api/v1/volumes/{id}`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/volumes/1",
    "data": {
      "id": 1,
      "volume": 100.0,
      "hide": false
    },
    "message": "Volume retrieved",
    "error": null
  }
  ```

### 3. Tạo dung tích (Admin)
- **Endpoint:** `POST /api/v1/volumes`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "volume": 50.0,
    "hide": false
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 201,
    "path": "/api/v1/volumes",
    "data": {
      "id": 2,
      "volume": 50.0,
      "hide": false
    },
    "message": "Volume retrieved",
    "error": null
  }
  ```

### 4. Cập nhật dung tích (Admin)
- **Endpoint:** `PUT /api/v1/volumes/{id}`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "volume": 50.0,
    "hide": true
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/volumes/2",
    "data": {
      "id": 2,
      "volume": 50.0,
      "hide": true
    },
    "message": "Volume Updated",
    "error": null
  }
  ```

### 5. Xóa dung tích (Admin)
- **Endpoint:** `DELETE /api/v1/volumes/{id}`
- **Auth:** Bearer Token (Admin)
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/volumes/2",
    "data": null,
    "message": "Volume Deleted",
    "error": null
  }
  ```

---

## 🧴 Perfume Module

Quản lý danh sách nước hoa, tìm kiếm và chi tiết sản phẩm.

### 1. Danh sách nước hoa (Phân trang & Tìm kiếm)
- **Endpoint:** `GET /api/v1/perfumes`
- **Auth:** None
- **Query Parameters:**
  - `page` (int, default: 1): Số trang.
  - `limit` (int, default: 8): Số lượng item mỗi trang.
  - `name` (string): Tìm kiếm theo tên.
  - `gender` (string): `Male`, `Female`, `Unisex`.
  - `fromPrice` (decimal): Giá thấp nhất.
  - `toPrice` (decimal): Giá cao nhất.
  - `orderBy` (string): Trường cần sort (vd: `price,asc`, `name,desc`).
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/perfumes",
    "data": {
      "content": [
        {
          "id": 1,
          "name": "Bleu de Chanel",
          "brand": "Chanel",
          "sampleImage": "http://res.cloudinary.com/.../image.jpg",
          "minPrice": 2500000.00
        }
      ],
      "page": 1,
      "size": 8,
      "totalElements": 1,
      "totalPages": 1
    },
    "message": "Get perfumes successfully",
    "error": null
  }
  ```

### 2. Chi tiết nước hoa
- **Endpoint:** `GET /api/v1/perfumes/{id}`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/perfumes/1",
    "data": {
      "id": 1,
      "name": "Bleu de Chanel",
      "description": "A woody aromatic fragrance...",
      "gender": "Male",
      "concentration": "EDP",
      "brand": "Chanel",
      "sampleImages": [
        "http://res.cloudinary.com/.../img1.jpg",
        "http://res.cloudinary.com/.../img2.jpg"
      ],
      "volumes": [
        {
          "id": 1, // Id của VolumePerfume
          "volume": 100.0,
          "price": 3000000.00
        },
        {
          "id": 3, // Id của VolumePerfume
          "volume": 50.0,
          "price": 2000000.00
        }
      ],
      "notes": {
        "top": ["Grapefruit", "Lemon"],
        "heart": ["Ginger", "Jasmine"],
        "base": ["Sandalwood", "Patchouli"]
      }
    },
    "message": "Perfume retrieved",
    "error": null
  }
  ```

### 3. Tạo nước hoa (Admin)
- **Endpoint:** `POST /api/v1/perfumes`
- **Auth:** Bearer Token (Admin)
- **Content-Type:** `multipart/form-data`
- **Request Body (Form Data):**
  - `name` (String): Tên nước hoa.
  - `description` (String): Mô tả.
  - `gender` (String): `Male`, `Female`, `Unisex`.
  - `concentration` (String): `EDC`, `EDT`, `EDP`, `Parfum`.
  - `brandId` (Integer): ID thương hiệu.
  - `volumes[0].volumeId` (Integer): ID dung tích.
  - `volumes[0].price` (Decimal): Giá.
  - `notes[0].noteId` (Integer): ID mùi hương.
  - `notes[0].type` (String): `Top`, `Heart`, `Base`.
  - `sampleImages` (File[]): Mảng các file ảnh.
  - `hide` (Boolean): Ẩn/hiện.
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 201,
    "path": "/api/v1/perfumes",
    "data": {
      "id": 1,
      "name": "Bleu de Chanel",
      "description": "A woody aromatic fragrance for men...",
      "gender": "Male",
      "concentration": "EDP",
      "brand": "Chanel",
      "sampleImages": ["http://res.cloudinary.com/perfume-store/image/upload/v1/bleu-de-chanel.jpg"],
      "volumes": [{ "volume": 100.0, "price": 3000000.00 }],
      "notes": { 
        "top": ["Grapefruit", "Lemon", "Mint"], 
        "heart": ["Ginger", "Jasmine", "Nutmeg"], 
        "base": ["Sandalwood", "Patchouli", "Cedar"] 
      }
    },
    "message": "Perfume created",
    "error": null
  }
  ```

### 4. Cập nhật nước hoa (Admin)
- **Endpoint:** `PUT /api/v1/perfumes/{id}`
- **Auth:** Bearer Token (Admin)
- **Content-Type:** `multipart/form-data`
- **Request Body (Form Data):**
  - Giống Create, bổ sung:
  - `addSampleImages` (File[]): Thêm ảnh mới.
  - `deleteSampleImages` (String[]): Danh sách URL ảnh cần xóa.
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/perfumes/1",
    "data": {
      "id": 1,
      "name": "Bleu de Chanel",
      "description": "An intense woody aromatic fragrance...",
      "gender": "Male",
      "concentration": "EDP",
      "brand": "Chanel",
      "sampleImages": [
        "http://res.cloudinary.com/perfume-store/image/upload/v1/bleu-de-chanel-1.jpg",
        "http://res.cloudinary.com/perfume-store/image/upload/v1/bleu-de-chanel-2.jpg"
      ],
      "volumes": [
        { "volume": 100.0, "price": 3000000.00 },
        { "volume": 50.0, "price": 2000000.00 }
      ],
      "notes": {
        "top": ["Grapefruit", "Lemon", "Mint"],
        "heart": ["Ginger", "Jasmine", "Nutmeg"],
        "base": ["Sandalwood", "Patchouli", "Cedar"]
      }
    },
    "message": "Perfume updated",
    "error": null
  }
  ```

### 5. Xóa nước hoa (Admin)
- **Endpoint:** `DELETE /api/v1/perfumes/{id}`
- **Auth:** Bearer Token (Admin)
- **Response:** `200 OK`

---

## 🧾 Invoice Module

Quản lý đơn hàng, thanh toán và lịch sử mua hàng.

### 1. Danh sách đơn hàng (Admin)
- **Endpoint:** `GET /api/v1/invoices`
- **Auth:** Bearer Token (Admin)
- **Query Parameters:** `page`, `limit`, `searchKey`, `fromDate`, `toDate`, `deliveryStatus`, `paymentMethod`.
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/invoices",
    "data": {
      "content": [
        {
          "id": 1,
          "createdAt": "2024-04-29T10:00:00",
          "total": 5000000.00,
          "receiverName": "Nguyen Van A",
          "phoneNumber": "0987654321",
          "shippingAddress": "123 Ly Tu Trong, HCM",
          "deliveryStatus": "PENDING",
          "paymentMethod": "Cash"
        }
      ],
      "page": 1,
      "size": 8,
      "totalElements": 1,
      "totalPages": 1
    },
    "message": "Get paginated invoices successfully",
    "error": null
  }
  ```

### 2. Chi tiết đơn hàng
- **Endpoint:** `GET /api/v1/invoices/{id}`
- **Auth:** Bearer Token (Owner hoặc Admin)
- **Response:**
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
      "total": 5000000.00,
      "invoiceDetails": [
        {
          "perfumeName": "Bleu de Chanel",
          "volumeName": 100.0,
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

### 3. Lấy danh sách đơn hàng của tôi
- **Endpoint:** `GET /api/v1/users/me/invoices`
- **Auth:** Bearer Token
- **Query Parameters:** `page`, `limit`
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me/invoices",
    "data": {
      "content": [
        {
          "id": 1,
          "createdAt": "2024-04-29T10:00:00",
          "total": 5000000.00,
          "deliveryStatus": "DELIVERED",
          "itemPreviews": [
            "http://res.cloudinary.com/.../img1.jpg"
          ],
          "totalItems": 1
        }
      ],
      "page": 1,
      "size": 8,
      "totalElements": 1,
      "totalPages": 1
    },
    "message": "Get my invoices successfully",
    "error": null
  }
  ```

### 4. Tạo đơn hàng (Checkout)
- **Endpoint:** `POST /api/v1/invoices`
- **Auth:** Bearer Token
- **Request Body:**
  ```json
  {
    "addressId": 1,
    "paymentMethod": "Cash",
    "items": [
      {
        "volumePerfumeId": 10,
        "quantity": 2
      }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/invoices",
    "data": {
      "id": 1,
      "createdAt": "2024-04-29T10:00:00",
      "total": 5000000.00,
      "receiverName": "Nguyen Van A",
      "phoneNumber": "0987654321",
      "shippingAddress": "123 Ly Tu Trong, HCM",
      "deliveryStatus": "PENDING",
      "paymentMethod": "Cash",
      "invoiceDetails": [
        {
          "perfumeName": "Bleu de Chanel",
          "volumeName": 100.0,
          "quantity": 1,
          "buyPrice": 3000000.00
        }
      ]
    },
    "message": "Invoice created",
    "error": null
  }
  ```

### 4. Cập nhật trạng thái đơn hàng (Admin)
- **Endpoint:** `PATCH /api/v1/invoices/{id}/status`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "deliveryStatus": "SHIPPING"
  }
  ```
- **Response:** `200 OK`

### 5. Hủy đơn hàng (User)
- **Endpoint:** `PATCH /api/v1/invoices/{id}/cancel`
- **Auth:** Bearer Token (Owner)
- **Response:** `200 OK`

---

## 📍 Address Module

Cung cấp dữ liệu hành chính (Tỉnh/Thành, Phường/Xã).

### 1. Danh sách Tỉnh/Thành và Phường/Xã
- **Endpoint:** `GET /api/v1/address/provinces`
- **Auth:** None
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/address/provinces",
    "data": {
      "Thành phố Hà Nội": [
        "Phường Ba Đình",
        "Phường Ngọc Hà",
        "Phường Giảng Võ"
      ],
      "Tỉnh Cao Bằng": [
        "Phường Thục Phán",
        "Phường Nùng Trí Cao"
      ],
      "Tỉnh Tuyên Quang": [
        "Phường Hà Giang 2",
        "Phường Hà Giang 1"
      ]
    },
    "message": "Get provinces successfully",
    "error": null
  }
  ```

---

## 👤 User Module

Quản lý thông tin cá nhân, địa chỉ và quản trị người dùng.

### 1. Thông tin cá nhân
- **Endpoint:** `GET /api/v1/users/me`
- **Auth:** Bearer Token
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me",
    "data": {
      "id": 1,
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "message": "Get user's profile successfully",
    "error": null
  }
  ```

### 2. Cập nhật thông tin cá nhân
- **Endpoint:** `PATCH /api/v1/users/me/profile`
- **Auth:** Bearer Token
- **Request Body:**
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me/profile",
    "data": {
      "id": 1,
      "name": "John Doe Updated",
      "username": "johndoe",
      "email": "john.updated@example.com"
    },
    "message": "Update profile successfully",
    "error": null
  }
  ```

### 3. Cập nhật mật khẩu
- **Endpoint:** `PATCH /api/v1/users/me/password`
- **Auth:** Bearer Token
- **Request Body:**
  ```json
  {
    "oldPassword": "password123",
    "newPassword": "newpassword456",
    "confirmPassword": "newpassword456"
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me/password",
    "data": null,
    "message": "Update password successfully",
    "error": null
  }
  ```

### 4. Danh sách địa chỉ nhận hàng
- **Endpoint:** `GET /api/v1/users/me/addresses`
- **Auth:** Bearer Token
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me/addresses",
    "data": [
      {
        "id": 1,
        "receiver": "Nguyen Van A",
        "phoneNumber": "0987654321",
        "cityName": "Ho Chi Minh",
        "wardName": "Ben Nghe",
        "deliveryAddress": "123 Ly Tu Trong",
        "hide": false
      }
    ],
    "message": "Get all user's addresses successfully",
    "error": null
  }
  ```

### 5. Thêm địa chỉ mới
- **Endpoint:** `POST /api/v1/users/me/addresses`
- **Auth:** Bearer Token
- **Request Body:**
  ```json
  {
    "receiver": "Nguyen Van A",
    "phoneNumber": "0987654321",
    "cityName": "Ho Chi Minh",
    "wardName": "Ben Nghe",
    "deliveryAddress": "123 Ly Tu Trong"
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 201,
    "path": "/api/v1/users/me/addresses",
    "data": {
      "id": 1,
      "receiver": "Nguyen Van A",
      "phoneNumber": "0987654321",
      "cityName": "Ho Chi Minh",
      "wardName": "Ben Nghe",
      "deliveryAddress": "123 Ly Tu Trong",
      "hide": false
    },
    "message": "User's address created",
    "error": null
  }
  ```

### 6. Cập nhật địa chỉ
- **Endpoint:** `PUT /api/v1/users/me/addresses/{addressId}`
- **Auth:** Bearer Token
- **Request Body:**
  ```json
  {
    "receiver": "Nguyen Van A Updated",
    "phoneNumber": "0987654321",
    "cityName": "Ho Chi Minh",
    "wardName": "Ben Nghe",
    "deliveryAddress": "456 Le Loi"
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me/addresses/1",
    "data": {
      "id": 1,
      "receiver": "Nguyen Van A",
      "phoneNumber": "0987654321",
      "cityName": "Ho Chi Minh",
      "wardName": "Ben Nghe",
      "deliveryAddress": "123 Ly Tu Trong",
      "hide": false
    },
    "message": "User's address updated",
    "error": null
  }
  ```

### 7. Xóa địa chỉ (Soft delete)
- **Endpoint:** `PATCH /api/v1/users/me/addresses/{addressId}`
- **Auth:** Bearer Token
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/users/me/addresses/1",
    "data": null,
    "message": "User's address deleted",
    "error": null
  }
  ```

### 8. Quản lý người dùng (Admin)

#### 8.1. Danh sách người dùng
- **Endpoint:** `GET /api/v1/admin/users`
- **Auth:** Bearer Token (Admin)
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/admin/users",
    "data": {
      "content": [
        {
          "id": 1,
          "name": "Admin",
          "username": "admin",
          "email": "admin@example.com",
          "superuser": true,
          "active": true
        }
      ],
      "page": 1,
      "size": 8,
      "totalElements": 1,
      "totalPages": 1
    },
    "message": "Get all users successfully",
    "error": null
  }
  ```

#### 8.2. Chi tiết người dùng
- **Endpoint:** `GET /api/v1/admin/users/{id}`
- **Auth:** Bearer Token (Admin)
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/admin/users/1",
    "data": {
      "id": 1,
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "superuser": false,
      "active": true
    },
    "message": "User retrieved",
    "error": null
  }
  ```

#### 8.3. Tạo user mới (Admin)
- **Endpoint:** `POST /api/v1/admin/users`
- **Auth:** Bearer Token (Admin)
- **Request Body:**
  ```json
  {
    "name": "New User",
    "username": "newuser",
    "email": "new@example.com",
    "superuser": false,
    "active": true
  }
  ```
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 201,
    "path": "/api/v1/admin/users",
    "data": {
      "id": 2,
      "name": "New User",
      "username": "newuser",
      "email": "new@example.com",
      "superuser": false,
      "active": true
    },
    "message": "User created with a default password",
    "error": null
  }
  ```

#### 8.4. Cập nhật user (Admin)
- **Endpoint:** `PUT /api/v1/admin/users/{id}`
- **Auth:** Bearer Token (Admin)
- **Request Body:** `UserAdminUpdateRequestDTO`
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/admin/users/2",
    "data": {
      "id": 2,
      "name": "New User Updated",
      "username": "newuser",
      "email": "new.updated@example.com",
      "superuser": false,
      "active": true
    },
    "message": "User updated",
    "error": null
  }
  ```

#### 8.5. Reset mật khẩu (Admin)
- **Endpoint:** `POST /api/v1/admin/users/{id}/reset-password`
- **Auth:** Bearer Token (Admin)
- **Response:**
  ```json
  {
    "timestamp": "2024-04-29T10:00:00Z",
    "status": 200,
    "path": "/api/v1/admin/users/2/reset-password",
    "data": {
      "id": 2,
      "name": "New User Updated",
      "username": "newuser",
      "email": "new.updated@example.com",
      "superuser": false,
      "active": true
    },
    "message": "User password reset to default",
    "error": null
  }
  ```

---

*(Danh sách chi tiết các API sẽ được cập nhật trong các phase tiếp theo)*
