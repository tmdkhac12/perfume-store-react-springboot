---
applyTo: "src/main/java/**"
---
# Quy ước API Request/Response
- Controller nên trả về `ResponseEntity<?>` thông qua `ApiResponseFactory.success/error` (`common/utils/ApiResponseFactory.java`) thay vì trả raw DTO.
- Error handling được tập trung trong `common/exceptions/GlobalExceptionsHandler.java`; ưu tiên throw domain exception (`NotFoundException`, `IllegalStateException`, validation exception) trong service.
- Query validation trên tham số controller sử dụng `@Validated` + bean validation annotation (`@Min`, `@Max`) và dựa vào global handler.
- Pagination dùng 1-based ở biên API, sau đó được chuyển sang 0-based cho JPA (`PageRequest.of(page - 1, limit, ...)`) trong service.

