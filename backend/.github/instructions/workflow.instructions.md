---
applyTo: ".github/**"
---
# Quy trình làm việc của Developer
- Các lệnh local cơ bản (Maven project, `pom.xml`):
  - `mvn clean test` (unit tests)
  - `mvn spring-boot:run` (app)
- Các test hiện có chủ yếu là unit test dùng JUnit 5 + Mockito, tập trung vào layer `service` và `mapper` (`src/test/java/.../service/*Test.java`, `.../mapper/*Test.java`).
- Mapper test khởi tạo trực tiếp implementation được sinh ra (ví dụ: `new BrandMapperImpl()` trong `BrandMapperTest`).

# Khi thêm mới hoặc thay đổi tính năng
- Giữ nguyên response envelope + phong cách exception tập trung; không trả về các JSON shape ad-hoc.
- Giữ key trong request payload theo camelCase và đặt filter/sort/pagination trong query params (`notes/api.txt`).
- Với write flow chạm vào nhiều bảng/file (ví dụ: perfume với volumes/notes/images), giữ method ở trạng thái transactional.
- Trước khi xóa dữ liệu tham chiếu (brand/volume/v.v.), tuân theo guard pattern hiện có: kiểm tra sự tồn tại của association và throw `IllegalStateException`.

