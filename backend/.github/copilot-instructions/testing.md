# Testing Conventions (Project-specific)
- Location & scope: Unit tests live under `src/test/java/...` and primarily target `service` and `mapper` layers (see `src/test/java/com/example/perfume_store/modules/*/service/*Test.java` and `.../mapper/*Test.java`).
- Frameworks: JUnit 5 + Mockito + AssertJ. Example files: `BrandServiceTest.java`, `VolumeServiceTest.java`, `BrandMapperTest.java`.
- Mockito setup: use `@ExtendWith(MockitoExtension.class)` at class level, `@Mock` for external dependencies and `@InjectMocks` for the service under test. Use `when(...).thenReturn(...)` and `verify(...)` to assert interactions.
- Isolation rule: Tests MUST NOT touch the real database, Cloudinary, or filesystem. Mock repositories, mappers, external services (Cloudinary/CloudinaryService, JwtService, etc.).
- Mapper tests: instantiate the generated MapStruct impl directly (e.g., `brandMapper = new BrandMapperImpl()`), do not start the Spring context for mapper unit tests.
- Assertion style: use AssertJ `assertThat(...)` for values and `assertThatThrownBy(...)` for exception assertions. Use `@DisplayName` to provide human-friendly test descriptions.
- Test structure & helpers: prefer small private factory methods to create test entities/DTOs (see `BrandServiceTest#createBrand(...)`). Name test methods with `subject_scenario_expected` or use `@DisplayName`.
- Exception testing: assert thrown exceptions and their messages (e.g., `NotFoundException`, `IllegalStateException`). Prefer `assertThatThrownBy(...).isInstanceOf(...).hasMessage(...)`.
- Avoid Spring context unless necessary: use `@SpringBootTest` only for the minimal `contextLoads()` check (example `PerfumeStoreApplicationTests`). Integration tests (controllers/repositories/specifications) are separate and should use dedicated setup.
- Running tests: use Maven command:
```powershell
mvn clean test
```

These rules are distilled from the existing tests and `notes/test.md` in the repo — follow them to keep new tests consistent with the project's style.

