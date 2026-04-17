---
applyTo: ".github/**"
---
# Developer Workflow
- Baseline local commands (Maven project, `pom.xml`):
  - `mvn clean test` (unit tests)
  - `mvn spring-boot:run` (app)
- Existing tests are mostly unit tests with JUnit 5 + Mockito focused on `service` and `mapper` layers (`src/test/java/.../service/*Test.java`, `.../mapper/*Test.java`).
- Mapper tests instantiate generated implementations directly (example: `new BrandMapperImpl()` in `BrandMapperTest`).

# When Adding or Changing Features
- Preserve response envelope + centralized exception style; do not return ad-hoc JSON shapes.
- Keep request payload keys camelCase and put filter/sort/pagination in query params (`notes/api.txt`).
- For write flows touching multiple tables/files (e.g., perfume with volumes/notes/images), keep methods transactional.
- Before deleting reference data (brand/volume/etc.), follow existing guard pattern checking association existence and throw `IllegalStateException`.

