---
applyTo: "src/main/java/**"
---
# Architecture & Module Conventions
- This backend is a **modular monolith** (see `notes/architecture.txt`): shared persistence in `src/main/java/com/example/perfume_store/domain`, feature logic in `src/main/java/com/example/perfume_store/modules/*`.
- Keep cross-cutting pieces in `src/main/java/com/example/perfume_store/common` (exception handling, response wrappers, utilities) and platform wiring in `src/main/java/com/example/perfume_store/configs`.
- API namespace convention is `/api/v1/...` (examples: `modules/brand/controller/BrandController.java`, `modules/perfume/controller/PerfumeController.java`).

# Module Conventions
- Typical vertical slice per module: `controller -> service -> mapper -> dto`, with repositories mostly in `domain/*`.
- Services commonly use private entity getters that throw `NotFoundException` (examples in `modules/perfume/service/PerfumeService.java`, `modules/invoice/service/InvoiceService.java`).
- MapStruct is the default mapping approach (`@Mapper(componentModel = "spring")`), including in-place updates via `@MappingTarget`.
- For list/filter endpoints, use JPA `Specification` classes in domain/entity packages (`domain/perfume/PerfumeSpecification.java`, `modules/invoice/entity/InvoiceSpecification.java`).
