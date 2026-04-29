package com.example.perfume_store.modules.user.dtos;

import com.example.perfume_store.modules.user.dtos.request.UserAdminUpdateRequestDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserAdminUpdateRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
        }
    }

    // --- Valid case ---

    @Test
    @DisplayName("should pass validation when all required fields are valid")
    void testValidDTO_AllFieldsValid() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("john@example.com");
        dto.setSuperuser(false);
        dto.setActive(true);

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation with superuser=true and active=false")
    void testValidDTO_FlagsVariations() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("Admin User");
        dto.setEmail("admin@example.com");
        dto.setSuperuser(true);
        dto.setActive(false);

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Name field tests ---

    @Test
    @DisplayName("should fail validation when name is blank")
    void testValidation_NameBlank() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("   ");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when name is null")
    void testValidation_NameNull() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName(null);
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when name exceeds 255 characters")
    void testValidation_NameExceedsMaxSize() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("A".repeat(256));
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Name must between 1 and 255 characters"));
    }

    @Test
    @DisplayName("should pass validation when name is at min boundary (1 character)")
    void testValidation_NameAtMinBoundary() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("A");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when name is at max boundary (255 characters)")
    void testValidation_NameAtMaxBoundary() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("A".repeat(255));
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Email field tests ---

    @Test
    @DisplayName("should fail validation when email format is invalid (no @)")
    void testValidation_EmailInvalidNoAt() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("johnexample.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Email is invalid"));
    }

    @Test
    @DisplayName("should fail validation when email format is invalid (missing domain)")
    void testValidation_EmailInvalidNoDomain() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("john@");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Email is invalid"));
    }

    @Test
    @DisplayName("should fail validation when email format is invalid (missing local part)")
    void testValidation_EmailInvalidMissingLocalPart() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Email is invalid"));
    }

    @Test
    @DisplayName("should pass validation with valid email format")
    void testValidation_EmailValid() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("john.doe@example.com");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when email is empty (not required)")
    void testValidation_EmailEmpty() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when email is null (not required)")
    void testValidation_EmailNull() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail(null);

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Boolean fields (no validation required) ---

    @Test
    @DisplayName("should accept any boolean values for superuser and active fields")
    void testValidation_BooleanFieldsAcceptAnyValue() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("john@example.com");
        dto.setSuperuser(true);
        dto.setActive(false);

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Multiple violations test ---

    @Test
    @DisplayName("should fail validation when multiple fields are invalid")
    void testValidation_MultipleFieldsInvalid() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("   ");
        dto.setEmail("invalid-email");

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(2); // name @NotBlank, email @Email
    }

    // --- Note: UserAdminUpdateRequestDTO is missing 'username' field compared to Create ---

    @Test
    @DisplayName("should validate correctly without username field (unlike Create DTO)")
    void testValidation_NoUsernameField() {
        UserAdminUpdateRequestDTO dto = new UserAdminUpdateRequestDTO();
        dto.setName("John Doe");
        dto.setEmail("john@example.com");
        // username field does not exist in Update DTO, so it cannot be set

        Set<ConstraintViolation<UserAdminUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }
}

