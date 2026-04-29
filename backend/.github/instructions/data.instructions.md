---
applyTo: "src/main/resources/**"
---
# Dữ liệu & Tích hợp
- MySQL được kỳ vọng cấu hình qua env var trong `src/main/resources/application.yaml` (`MYSQL_URL`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`); JPA dùng `ddl-auto: none`.
- Khởi tạo local DB dùng `docker-compose.yml` (MySQL expose tại `3307`) và tự động chạy SQL từ `database/init.sql` và `database/insert_data.sql`.
- Lưu trữ ảnh dùng Cloudinary (`configs/cloudinary/CloudinaryConfig.java`, `configs/cloudinary/CloudinaryService.java`); flow tạo/cập nhật perfume sẽ upload/delete file từ xa.
