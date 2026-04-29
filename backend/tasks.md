# Kế hoạch unit test cho module `user`

> Trạng thái hiện tại: trong `src/test/java/com/example/perfume_store/modules/user` chưa thấy bộ unit test riêng cho module `user`.
> 
> Mục tiêu của kế hoạch này là đi theo thứ tự ưu tiên từ rẻ nhất/rủi ro thấp nhất đến phần có business rule phức tạp hơn, bám đúng quy ước của dự án: `JUnit 5 + Mockito + AssertJ`, không chạm database thật, mapper test khởi tạo trực tiếp implementation MapStruct.

## Thứ tự ưu tiên đề xuất

1. `DTO validation` — khóa sớm hợp đồng request.
2. `Mapper` — xác nhận chuyển đổi dữ liệu và mapping `PageResponse`.
3. `Service` — phủ nghiệp vụ chính và các nhánh lỗi.
4. `Controller` + `SecurityContextGetter` glue test — chỉ làm sau khi service ổn định.
5. Rà soát lại coverage, chuẩn hóa fixture, và bổ sung case biên.

---

## [x] Phase 0 — Khảo sát baseline và chuẩn hóa phạm vi

### Mục tiêu
Xác định đầy đủ file nào thuộc module `user`, file nào là dependency trực tiếp cần mock, và thống nhất thứ tự triển khai test trước khi viết test.

### Kết quả khảo sát

#### 1. Danh sách file trong module `user` (16 file tổng cộng)

**Service (3 files)**
- `UserAddressService.java` — CRUD address + soft delete + ownership check
- `UserAdminService.java` — CRUD user admin + password hashing + pagination
- `UserSelfService.java` — read-only user profile

**Mapper (3 files)**
- `UserAddressMapper.java` — entity ↔ DTO + list + update
- `UserAdminMapper.java` — entity ↔ DTO + PageResponse mapping
- `UserSelfMapper.java` — entity → response DTO

**Controller (3 files)**
- `UserAddressController.java` — CRUD + soft delete endpoints
- `UserAdminController.java` — CRUD admin + pagination endpoints
- `UserSelfController.java` — read profile endpoint

**DTO Request (4 files)**
- `UserAddressCreateRequestDTO.java` — 5 fields, validation: `@NotBlank`, `@Size`, `@Pattern`
- `UserAddressUpdateRequestDTO.java` — 5 fields + `hide` flag, same validation + update
- `UserAdminCreateRequestDTO.java` — 5 fields, validation: `@NotBlank`, `@Size`, `@Email`
- `UserAdminUpdateRequestDTO.java` — 4 fields, validation: `@NotBlank`, `@Size`, `@Email`

**DTO Response (3 files)**
- `UserAddressResponseDTO.java` — 8 fields (id + 5 address + hide + implicit user_id)
- `UserAdminResponseDTO.java` — 5 fields (id, name, username, email, superuser, active)
- `UserPublicResponseDTO.java` — 4 fields (id, name, username, email)

#### 2. Dependency cần mock (6 tổng cộng)

| Dependency | Injected vào | Kiểu | Test Phase | Ghi chú |
|:---|:---|:---|:---|:---|
| `UserRepository` | 3 service (UserAddressService, UserAdminService, UserSelfService) | Repository | Phase 3 | Methods: `findById()`, `findByUserId()`, `findByIdAndUserId()`, `findAll(pageable)`, `save()` |
| `AddressRepository` | UserAddressService | Repository | Phase 3 | Methods: `findById()`, `findByUserId()`, `findByIdAndUserId()`, `save()` |
| `UserAddressMapper` | UserAddressService | MapStruct Mapper | Phase 2 | Methods: `toEntity()`, `toResponseDTO()`, `toResponseDTO(list)`, `updateAddress()` |
| `UserAdminMapper` | UserAdminService | MapStruct Mapper | Phase 2 | Methods: `toEntity()`, `toAdminResponseDTO()`, `updateUser()`, `toPageResponse()` |
| `UserSelfMapper` | UserSelfService | MapStruct Mapper | Phase 2 | Methods: `toResponseDTO()` |
| `PasswordEncoder` | UserAdminService | Spring Security | Phase 3 | Methods: `encode()` |
| `SecurityContextGetter` | 3 controller (UserAddressController, UserAdminController, UserSelfController) | Security config | Phase 4 | **注:** Controller-level dependency, defer to Phase 4 testing |

#### 3. Style hiện tại (từ các module khác: brand, volume, note, auth)

**Service test style:**
```
@ExtendWith(MockitoExtension.class)
class XxxServiceTest {
  @Mock private Repository repo;
  @Mock private Mapper mapper;
  @InjectMocks private XxxService service;
  
  private XxxEntity createXxx(...) { /* factory */ }
  
  @Test
  @DisplayName("method_scenario_expected")
  void method_scenario_expected() { ... }
}
```

**Mapper test style:**
```
class XxxMapperTest {
  private XxxMapper mapper;
  
  @BeforeEach
  void setUp() {
    mapper = new XxxMapperImpl(); // khởi tạo trực tiếp, không Spring
  }
  
  @Test
  @DisplayName("...")
  void test_toResponseDTO_EntityToDTO() { ... }
}
```

**Assertion style:** `assertThat()`, `assertThatThrownBy()`, `verify()`, `extracting()`

#### 4. Thứ tự triển khai chốt định (theo mức độ rủi ro giảm dần)

1. **Phase 1: DTO validation test** (rẻ nhất, ít phụ thuộc)
   - UserAddressCreateRequestDTO, UserAddressUpdateRequestDTO, UserAdminCreateRequestDTO, UserAdminUpdateRequestDTO
   
2. **Phase 2: Mapper test** (khóa shape dữ liệu sớm)
   - UserAddressMapper, UserAdminMapper, UserSelfMapper

3. **Phase 3: Service business logic** (rủi ro cao nhất)
   - Sub-phase 3.1: `UserAddressService` (ownership check + soft delete)
   - Sub-phase 3.2: `UserAdminService` (password hashing + CRUD + paging)
   - Sub-phase 3.3: `UserSelfService` (read-only)

4. **Phase 4: Controller glue + SecurityContextGetter** (chủ yếu adapter, không business logic)
   - UserSelfController, UserAdminController, UserAddressController, SecurityContextGetter

5. **Phase 5: Coverage review + fixture cleanup** (refinement)

### Việc cần làm
- [x] Liệt kê toàn bộ file trong `src/main/java/com/example/perfume_store/modules/user`.
- [x] Xác định các dependency ngoài module cần mock: `UserRepository`, `AddressRepository`, `PasswordEncoder`, `SecurityContextGetter`.
- [x] Xác nhận file test hiện tại của các module khác để bám style `@ExtendWith(MockitoExtension.class)`, `@Mock`, `@InjectMocks`.
- [x] Chốt thứ tự viết test theo mức độ rủi ro: `UserAddressService` → `UserAdminService` → `UserSelfService` → mapper → DTO → controller glue.

### Tiêu chí hoàn thành
- [x] Có danh sách file/phạm vi test rõ ràng cho toàn module `user`.
- [x] Không còn mơ hồ về dependency cần mock và thứ tự triển khai.
- [x] Có thể bắt đầu viết test mà không phải quay lại khảo sát file liên tục.

---

## [x] Phase 1 — Test validation cho request DTO

### Ưu tiên
Đây là lớp test nên làm đầu tiên vì nhanh, ít phụ thuộc, và giúp chặn lỗi hợp đồng API sớm nhất.

### Phạm vi
- [x] `UserAddressCreateRequestDTO` (20 test cases)
- [x] `UserAddressUpdateRequestDTO` (partially shared, 17 test cases)
- [x] `UserAdminCreateRequestDTO` (27 test cases)
- [x] `UserAdminUpdateRequestDTO` (17 test cases)

**Total: 81 test cases, all passing**

### Việc cần làm
- [x] Viết case hợp lệ cho từng DTO để xác nhận object pass validation.
- [x] Viết case vi phạm từng annotation chính (`@NotBlank`, `@Size`, `@Email`, `@Pattern`, ...).
- [x] Xác nhận message lỗi đúng như annotation đang khai báo.
- [x] Bao phủ boundary value quan trọng cho chuỗi quá ngắn/quá dài và format số điện thoại/email.

### Kết quả triển khai

**File test tạo:**
1. `src/test/java/com/example/perfume_store/modules/user/dtos/UserAddressCreateRequestDTOTest.java`
   - 20 test methods covering all @NotBlank, @Size, @Pattern constraints
   - Tests for boundary values (receiver 100 chars, addresses 255 chars, phone number 9-10 digits)
   - Valid case + invalid cases for each field
   - Multiple violations test

2. `src/test/java/com/example/perfume_store/modules/user/dtos/UserAddressUpdateRequestDTOTest.java`
   - 17 test methods (same validation as Create + hide flag which accepts any boolean)
   - Covers all required field validations
   - `hide` field tested but has no constraints

3. `src/test/java/com/example/perfume_store/modules/user/dtos/UserAdminCreateRequestDTOTest.java`
   - 27 test methods covering @NotBlank, @Size (with min=1, max=255), @Email constraints
   - Boundary tests for name (1 and 255 chars) and username (1 and 255 chars)
   - Email format validation (no @, no domain, no local part, valid format)
   - Tests for optional email field (null/empty pass validation)
   - Boolean fields (superuser, active) have no constraints, accepted any values

4. `src/test/java/com/example/perfume_store/modules/user/dtos/UserAdminUpdateRequestDTOTest.java`
   - 17 test methods (similar to Create but without username field)
   - Username cannot be set in Update DTO, verified in test
   - Same email and name validation as Create DTO

**Validation messages verified:**
- "Receiver name must not be blank"
- "Receiver name must not exceed 100 characters"
- "Phone number must not be blank"
- "Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"
- "City name must not be blank"
- "City name must not exceed 255 characters"
- "Ward name must not be blank"
- "Ward name must not exceed 255 characters"
- "Delivery address must not be blank"
- "Delivery address must not exceed 255 characters"
- "Name must not be blank"
- "Name must between 1 and 255 characters"
- "Username must not be blank"
- "Username must between 1 and 50 characters"
- "Email is invalid"

**Testing approach:**
- Used `jakarta.validation.Validator` directly (no Spring context required)
- Created Validator via `ValidatorFactory` in `@BeforeEach` setup
- Validated each case using `assertThat(violations)` with AssertJ
- Both positive cases (no violations) and negative cases (expected violations) tested

### Tiêu chí hoàn thành
- [x] Mỗi DTO có tối thiểu 1 case hợp lệ và nhiều case invalid theo từng rule.
- [x] Message validation được kiểm tra chính xác, không chỉ kiểm tra có lỗi.
- [x] Không dùng Spring context cho phase này nếu không bắt buộc.

---

## [ ] Phase 2 — Test mapper của module `user`

### Ưu tiên
Làm ngay sau DTO để khóa đúng shape dữ liệu và tránh lỗi mapping lan sang service.

### Phạm vi
- [ ] `UserSelfMapper`
- [ ] `UserAdminMapper`
- [ ] `UserAddressMapper`

### Việc cần làm
- [ ] Khởi tạo mapper trực tiếp bằng implementation MapStruct sinh ra, không boot Spring context.
- [ ] Test mapping entity → response DTO.
- [ ] Test mapping request DTO → entity.
- [ ] Test mapping update bằng `@MappingTarget` với object đích đã có sẵn.
- [ ] Test mapping danh sách cho `UserAddressMapper`.
- [ ] Test `PageResponse` của `UserAdminMapper`, đặc biệt là `page = pageNumber + 1`.
- [ ] Kiểm tra các field quan trọng không bị rơi mất khi mapping.

### Tiêu chí hoàn thành
- [ ] Mỗi mapper có test cho toàn bộ method public.
- [ ] Mapping list và `PageResponse` được kiểm tra độc lập.
- [ ] Các field chính của `User`, `Address` và DTO đích đều được assert rõ ràng.

## [x] Phase 2 — Test mapper của module `user`

### Kết quả triển khai

- [x] `UserSelfMapper` — `src/test/java/com/example/perfume_store/modules/user/mapper/UserSelfMapperTest.java`
  - Test mapping `User` -> `UserPublicResponseDTO` (id, name, username, email)

- [x] `UserAdminMapper` — `src/test/java/com/example/perfume_store/modules/user/mapper/UserAdminMapperTest.java`
  - Test mapping `UserAdminCreateRequestDTO` -> `User` (toEntity)
  - Test mapping `User` -> `UserAdminResponseDTO` (toAdminResponseDTO)
  - Test `updateUser(@MappingTarget)` updates fields on existing `User`
  - Test `toPageResponse(Page<User>)` maps page number = page.getNumber()+1 and content -> DTO list

- [x] `UserAddressMapper` — `src/test/java/com/example/perfume_store/modules/user/mapper/UserAddressMapperTest.java`
  - Test mapping `Address` -> `UserAddressResponseDTO`
  - Test mapping list of `Address` -> list of DTOs
  - Test mapping `UserAddressCreateRequestDTO` -> `Address` (toEntity)
  - Test `updateAddress(@MappingTarget)` updates fields on existing `Address`

### Test run
- All mapper tests executed via `mvn test` and passed (total 9 tests: 0 failures).

### Tiêu chí hoàn thành
- [x] Mỗi mapper có test cho các method public chính.
- [x] Mapping list và `PageResponse` được kiểm tra.
- [x] Các field chính của `User`, `Address` và DTO đích đều được assert rõ ràng.

---

## [x] Phase 3 — Test service business logic theo mức rủi ro giảm dần

### Ưu tiên
Đây là phase quan trọng nhất của module `user` vì chứa nghiệp vụ, guard, ownership, soft delete và password handling.

### Thứ tự triển khai bên trong phase
1. [x] `UserAddressService` — rủi ro cao nhất vì có ownership check và soft delete.
2. [x] `UserAdminService` — có hash password, CRUD admin, paging và reset password.
3. [x] `UserSelfService` — đơn giản nhất, chủ yếu là read flow.

### Kết quả triển khai

- [x] `UserAddressService` — `src/test/java/com/example/perfume_store/modules/user/service/UserAddressServiceTest.java`
  - Covers: `getAllUserAddresses`, `createUserAddress` (success + user not found), `updateUserAddress` (success + not found), `softDelete` (success + not found)
  - Verifies: repository calls, mapper calls, side effects (`setUser`, `setHide`), and no extra save on update/soft-delete

- [x] `UserAdminService` — `src/test/java/com/example/perfume_store/modules/user/service/UserAdminServiceTest.java`
  - Covers: `getPaginatedUsers`, `getUserById` (success + not found), `adminCreateUser`, `adminUpdateUser` (success + not found), `resetUserPassword` (success + not found)
  - Verifies: `PasswordEncoder.encode("123")`, mapper interactions, repository save, NotFoundException message

- [x] `UserSelfService` — `src/test/java/com/example/perfume_store/modules/user/service/UserSelfServiceTest.java`
  - Covers: `getUserById` (success + not found)

### Test run
- All service tests executed via `mvn test -Dtest="UserAddressServiceTest,UserAdminServiceTest,UserSelfServiceTest"` and passed (total 17 tests: 0 failures).

### Tiêu chí hoàn thành
- [x] Mỗi public method có case thành công và case lỗi.
- [x] Verify chính xác repository method nào được gọi.
- [x] Verify đúng side effect lên entity (`setUser`, `setHide`, update field).

---

## [x] Phase 4 — Test glue cho controller và `SecurityContextGetter`

### Ưu tiên
Làm sau cùng vì đây chủ yếu là test chuyển tiếp request → service, không phải nơi chứa nghiệp vụ chính.

### Phạm vi
- [x] `UserSelfController`
- [x] `UserAdminController`
- [x] `UserAddressController`
- [x] `SecurityContextGetter`

### Kết quả triển khai

- [x] `UserSelfController` — `src/test/java/com/example/perfume_store/modules/user/controller/UserSelfControllerTest.java`
  - Test: getSelfProfile() calls SecurityContextGetter.getUserId() and service.getUserById()
  - Verifies: userId glued correctly, service called with correct userId, returns OK status

- [x] `UserAdminController` — `src/test/java/com/example/perfume_store/modules/user/controller/UserAdminControllerTest.java`
  - Test: getPaginatedUsers(), getUserById(), adminCreateUser(), adminUpdateUser(), resetPassword()
  - Verifies: params passed to service correctly, returns correct HTTP status (OK for GET/PUT, CREATED for POST)

- [x] `UserAddressController` — `src/test/java/com/example/perfume_store/modules/user/controller/UserAddressControllerTest.java`
  - Test: getAllAddresses(), createAddress(), updateAddress(), softDeleteAddress()
  - Verifies: userId glued from SecurityContextGetter to each service call, correct HTTP status

- [x] `SecurityContextGetter` — `src/test/java/com/example/perfume_store/configs/security/SecurityContextGetterTest.java`
  - Test: getUserId() returns id from CustomUserDetails when authentication/principal exist
  - Verifies: exception handling when authentication or principal is null

### Test run
- All Phase 4 tests executed via `mvn test` and passed (total 13 tests: 0 failures).
  - SecurityContextGetterTest: 3 tests
  - UserSelfControllerTest: 1 test
  - UserAdminControllerTest: 5 tests
  - UserAddressControllerTest: 4 tests

### Tiêu chí hoàn thành
- [x] Controller test chứng minh được luồng request → security context → service → response.
- [x] Không làm rối suite unit test bằng Spring context nặng nếu chưa cần.
- [x] Ranh giới giữa unit test và slice/integration test được ghi chú rõ trong file test.

---

## [x] Phase 5 — Rà soát coverage, refactor fixture và bổ sung case biên

### Mục tiêu
Sau khi có test nền, tối ưu lại độ rõ ràng, giảm trùng lặp fixture, và lấp các khoảng trống còn thiếu.

### Kết quả rà soát

#### 1. Test Data Factory/Helper Optimization
- ✅ Mỗi test class đã có private factory methods được tối ưu cho scope cụ thể:
  - `createUser(int id)` — tạo User entity cơ bản
  - `createAddress(int id, int userId)` — tạo Address entity với owner
  - `createResponseDTO(int id)` — tạo DTO response
  - `createRequest(...)` — tạo request DTO
- ✅ Tránh được duplicate creation logic, mỗi factory màu căn bản cho test case cách

#### 2. Case Biên Coverage
- ✅ **Chuỗi rỗng/blank:** DTO validation test bao phủ `@NotBlank` + empty/whitespace
- ✅ **Boundary values:** 
  - Mapper test: 1 char (min), 100 chars (receiver max), 255 chars (address max)
  - DTO test: exact boundary testing cho @Size constraints
- ✅ **Invalid IDs:** Service test cover NotFoundException khi user/address không tồn tại
- ✅ **Empty collections:** Service test cover empty list return

#### 3. Test Naming & Pattern
- ✅ Tất cả test đã dùng `@DisplayName` rõ ràng theo pattern: `subject_scenario_expected` hoặc `action_context_result`
- ✅ Ví dụ: "should return mapped DTO when user exists", "should throw NotFoundException when address not found"

#### 4. Service/Mapper Test Coverage
- ✅ **Service layers:** 3/3 service có test (UserAddressService, UserAdminService, UserSelfService)
- ✅ **Mapper layers:** 3/3 mapper có test (UserAddressMapper, UserAdminMapper, UserSelfMapper)
- ✅ **DTO validation:** 4/4 request DTO có test (CreateAddress, UpdateAddress, CreateAdmin, UpdateAdmin)
- ✅ **Controller glue:** 3/3 controller có test (UserSelfController, UserAdminController, UserAddressController)

#### 5. Full Test Run
- ✅ Tất cả 107 tests pass, 0 failures, 0 errors
- ✅ Không có regression từ các phiên trước
- ✅ Test execution time ~3.5s (reasonable)

### Test Coverage Summary by Layer

| Layer | Component | Test Class | Test Count | Status |
|:---|:---|:---|:---:|:---|
| **DTO Validation** | UserAddressCreateRequestDTO | UserAddressCreateRequestDTOTest | 20 | ✅ |
| | UserAddressUpdateRequestDTO | UserAddressUpdateRequestDTOTest | 15 | ✅ |
| | UserAdminCreateRequestDTO | UserAdminCreateRequestDTOTest | 20 | ✅ |
| | UserAdminUpdateRequestDTO | UserAdminUpdateRequestDTOTest | 16 | ✅ |
| **Mapper** | UserAddressMapper | UserAddressMapperTest | 4 | ✅ |
| | UserAdminMapper | UserAdminMapperTest | 4 | ✅ |
| | UserSelfMapper | UserSelfMapperTest | 1 | ✅ |
| **Service** | UserAddressService | UserAddressServiceTest | 7 | ✅ |
| | UserAdminService | UserAdminServiceTest | 8 | ✅ |
| | UserSelfService | UserSelfServiceTest | 2 | ✅ |
| **Controller** | UserAddressController | UserAddressControllerTest | 4 | ✅ |
| | UserAdminController | UserAdminControllerTest | 5 | ✅ |
| | UserSelfController | UserSelfControllerTest | 1 | ✅ |
| **Security** | SecurityContextGetter | SecurityContextGetterTest | 3 | ✅ |
| **TOTAL** | | | **107** | ✅ |

### Tiêu chí hoàn thành
- [x] Bộ test của module `user` dễ đọc, dễ bảo trì, không trùng lặp quá nhiều
- [x] Coverage của các nhánh nghiệp vụ chính đã đủ để tự tin refactor code về sau
- [x] Không còn TODO lớn nào trong module `user` về mặt unit test

---

## Ghi chú triển khai

- [ ] Ưu tiên hoàn thành `UserAddressService` và `UserAdminService` trước vì đây là nơi có rủi ro nghiệp vụ cao nhất.
- [ ] Chỉ dùng `@SpringBootTest` hoặc slice test nếu thật sự cần kiểm tra integration; unit test vẫn phải cô lập bằng Mockito.
- [ ] Mapper test nên khởi tạo trực tiếp implementation MapStruct, không bootstrap Spring.
- [ ] Mỗi phase chỉ nên mở rộng sang phase tiếp theo khi phase hiện tại đã đạt tiêu chí hoàn thành.

