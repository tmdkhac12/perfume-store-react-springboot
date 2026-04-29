---
applyTo: "src/main/java/**"
---
# Quy ước Kiến trúc & Module
- Backend này là một **modular monolith** (xem `notes/architecture.txt`): persistence dùng chung nằm trong `src/main/java/com/example/perfume_store/domain`, logic tính năng nằm trong `src/main/java/com/example/perfume_store/modules/*`.
- Giữ các thành phần cross-cutting trong `src/main/java/com/example/perfume_store/common` (exception handling, response wrapper, utility) và phần platform wiring trong `src/main/java/com/example/perfume_store/configs`.
- Quy ước API namespace là `/api/v1/...` (ví dụ: `modules/brand/controller/BrandController.java`, `modules/perfume/controller/PerfumeController.java`).

# Quy ước Module
- Vertical slice điển hình cho mỗi module: `controller -> service -> mapper -> dto`, với repository chủ yếu nằm trong `domain/*`.
- Service thường dùng private entity getter để throw `NotFoundException` (ví dụ trong `modules/perfume/service/PerfumeService.java`, `modules/invoice/service/InvoiceService.java`).
- MapStruct là cách tiếp cận mapping mặc định (`@Mapper(componentModel = "spring")`), bao gồm cả cập nhật in-place qua `@MappingTarget`.
- Với endpoint list/filter, dùng các lớp JPA `Specification` trong package domain/entity (`domain/perfume/PerfumeSpecification.java`, `modules/invoice/entity/InvoiceSpecification.java`).
