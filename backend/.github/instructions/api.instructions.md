---
applyTo: "src/main/java/**"
---
# API Request/Response Conventions
- Controllers should return `ResponseEntity<?>` via `ApiResponseFactory.success/error` (`common/utils/ApiResponseFactory.java`) instead of raw DTOs.
- Error handling is centralized in `common/exceptions/GlobalExceptionsHandler.java`; prefer throwing domain exceptions (`NotFoundException`, `IllegalStateException`, validation exceptions) in services.
- Query validation on controller params uses `@Validated` + bean validation annotations (`@Min`, `@Max`) and relies on global handlers.
- Pagination is 1-based at API boundary, then converted to 0-based for JPA (`PageRequest.of(page - 1, limit, ...)`) in services.

