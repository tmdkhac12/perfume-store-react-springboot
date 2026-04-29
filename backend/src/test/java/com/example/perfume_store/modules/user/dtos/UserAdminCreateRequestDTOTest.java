package com.example.perfume_store.modules.user.dtos;

import com.example.perfume_store.modules.user.dtos.request.UserAdminCreateRequestDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserAdminCreateRequestDTOTest {

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
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");
        dto.setSuperuser(false);
        dto.setActive(true);

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation with superuser=true and active=false")
    void testValidDTO_FlagsVariations() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("Admin User");
        dto.setUsername("admin");
        dto.setEmail("admin@example.com");
        dto.setSuperuser(true);
        dto.setActive(false);

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Name field tests ---

    @Test
    @DisplayName("should fail validation when name is blank")
    void testValidation_NameBlank() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("   ");
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when name is null")
    void testValidation_NameNull() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName(null);
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when name exceeds 255 characters")
    void testValidation_NameExceedsMaxSize() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("A".repeat(256));
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Name must between 1 and 255 characters"));
    }

    @Test
    @DisplayName("should pass validation when name is at min boundary (1 character)")
    void testValidation_NameAtMinBoundary() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("A");
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when name is at max boundary (255 characters)")
    void testValidation_NameAtMaxBoundary() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("A".repeat(255));
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Username field tests ---

    @Test
    @DisplayName("should fail validation when username is blank")
    void testValidation_UsernameBlank() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("   ");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Username must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when username is null")
    void testValidation_UsernameNull() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername(null);
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Username must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when username exceeds 255 characters")
    void testValidation_UsernameExceedsMaxSize() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("A".repeat(256));
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Username must between 1 and 50 characters"));
    }

    @Test
    @DisplayName("should pass validation when username is at min boundary (1 character)")
    void testValidation_UsernameAtMinBoundary() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("a");
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when username is at max boundary (255 characters)")
    void testValidation_UsernameAtMaxBoundary() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("a".repeat(255));
        dto.setEmail("john@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Email field tests ---

    @Test
    @DisplayName("should fail validation when email format is invalid (no @)")
    void testValidation_EmailInvalidNoAt() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("johnexample.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Email is invalid"));
    }

    @Test
    @DisplayName("should fail validation when email format is invalid (missing domain)")
    void testValidation_EmailInvalidNoDomain() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("john@");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Email is invalid"));
    }

    @Test
    @DisplayName("should fail validation when email format is invalid (missing local part)")
    void testValidation_EmailInvalidMissingLocalPart() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Email is invalid"));
    }

    @Test
    @DisplayName("should pass validation with valid email format")
    void testValidation_EmailValid() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("john.doe@example.com");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when email is empty (not required)")
    void testValidation_EmailEmpty() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when email is null (not required)")
    void testValidation_EmailNull() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail(null);

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Boolean fields (no validation required) ---

    @Test
    @DisplayName("should accept any boolean values for superuser and active fields")
    void testValidation_BooleanFieldsAcceptAnyValue() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("John Doe");
        dto.setUsername("johndoe");
        dto.setEmail("john@example.com");
        dto.setSuperuser(true);
        dto.setActive(false);

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Multiple violations test ---

    @Test
    @DisplayName("should fail validation when multiple fields are blank")
    void testValidation_MultipleFieldsBlank() {
        UserAdminCreateRequestDTO dto = new UserAdminCreateRequestDTO();
        dto.setName("   ");
        dto.setUsername("   ");
        dto.setEmail("invalid-email");

        Set<ConstraintViolation<UserAdminCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(3); // name @NotBlank, username @NotBlank, email @Email
    }
}

