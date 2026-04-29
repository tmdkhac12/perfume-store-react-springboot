package com.example.perfume_store.modules.user.dtos;

import com.example.perfume_store.modules.user.dtos.request.UserAddressCreateRequestDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserAddressCreateRequestDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
        }
    }

    // --- Valid case ---

    @Test
    @DisplayName("should pass validation when all fields are valid")
    void testValidDTO_AllFieldsValid() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Receiver field tests ---

    @Test
    @DisplayName("should fail validation when receiver is blank")
    void testValidation_ReceiverBlank() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("   ");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Receiver name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when receiver is null")
    void testValidation_ReceiverNull() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver(null);
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Receiver name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when receiver exceeds 100 characters")
    void testValidation_ReceiverExceedsMaxSize() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("A".repeat(101));
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Receiver name must not exceed 100 characters"));
    }

    @Test
    @DisplayName("should pass validation when receiver is at max size boundary (100 characters)")
    void testValidation_ReceiverAtMaxSizeBoundary() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("A".repeat(100));
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Phone number field tests ---

    @Test
    @DisplayName("should fail validation when phone number is blank (both @NotBlank and @Pattern fail)")
    void testValidation_PhoneNumberBlank() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("   ");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(2); // @NotBlank and @Pattern both fail on blank string
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must not be blank"));
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"));
    }

    @Test
    @DisplayName("should fail validation when phone number is null")
    void testValidation_PhoneNumberNull() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber(null);
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when phone number format is invalid (no prefix)")
    void testValidation_PhoneNumberInvalidNoPrefix() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("1234567890");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"));
    }

    @Test
    @DisplayName("should fail validation when phone number format is invalid (too short)")
    void testValidation_PhoneNumberTooShort() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("012345678");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"));
    }

    @Test
    @DisplayName("should pass validation when phone number starts with 0 (9 digits)")
    void testValidation_PhoneNumberValid_PrefixZero_9Digits() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when phone number starts with 0 (10 digits)")
    void testValidation_PhoneNumberValid_PrefixZero_10Digits() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("01234567890");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when phone number starts with +84 (9 digits)")
    void testValidation_PhoneNumberValid_Plus84_9Digits() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("+84123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when phone number starts with +84 (10 digits)")
    void testValidation_PhoneNumberValid_Plus84_10Digits() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("+841234567890");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- City name field tests ---

    @Test
    @DisplayName("should fail validation when city name is blank")
    void testValidation_CityNameBlank() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("   ");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("City name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when city name exceeds 255 characters")
    void testValidation_CityNameExceedsMaxSize() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("A".repeat(256));
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("City name must not exceed 255 characters"));
    }

    // --- Ward name field tests ---

    @Test
    @DisplayName("should fail validation when ward name is blank")
    void testValidation_WardNameBlank() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("   ");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Ward name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when ward name exceeds 255 characters")
    void testValidation_WardNameExceedsMaxSize() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("A".repeat(256));
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Ward name must not exceed 255 characters"));
    }

    // --- Delivery address field tests ---

    @Test
    @DisplayName("should fail validation when delivery address is blank")
    void testValidation_DeliveryAddressBlank() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("   ");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Delivery address must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when delivery address exceeds 255 characters")
    void testValidation_DeliveryAddressExceedsMaxSize() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("A".repeat(256));

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Delivery address must not exceed 255 characters"));
    }

    // --- Multiple violations test ---

    @Test
    @DisplayName("should fail validation when multiple fields are blank (phone has 2 violations)")
    void testValidation_MultipleFieldsBlank() {
        UserAddressCreateRequestDTO dto = new UserAddressCreateRequestDTO();
        dto.setReceiver("   ");
        dto.setPhoneNumber("   ");
        dto.setCityName("   ");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressCreateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(4); // receiver @NotBlank; phone @NotBlank + @Pattern (2); city @NotBlank
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Receiver name must not be blank"));
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must not be blank"));
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"));
        assertThat(violations).anyMatch(v -> v.getMessage().equals("City name must not be blank"));
    }
}



