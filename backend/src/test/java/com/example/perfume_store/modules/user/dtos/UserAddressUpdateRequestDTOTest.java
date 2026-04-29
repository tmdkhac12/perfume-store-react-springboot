package com.example.perfume_store.modules.user.dtos;

import com.example.perfume_store.modules.user.dtos.request.UserAddressUpdateRequestDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserAddressUpdateRequestDTOTest {

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
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");
        dto.setHide(false);

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when hide flag is true")
    void testValidDTO_HideFlagTrue() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");
        dto.setHide(true);

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- Receiver field tests ---

    @Test
    @DisplayName("should fail validation when receiver is blank")
    void testValidation_ReceiverBlank() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("   ");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Receiver name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when receiver exceeds 100 characters")
    void testValidation_ReceiverExceedsMaxSize() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("A".repeat(101));
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Receiver name must not exceed 100 characters"));
    }

    // --- Phone number field tests ---

    @Test
    @DisplayName("should fail validation when phone number is blank (both @NotBlank and @Pattern fail)")
    void testValidation_PhoneNumberBlank() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("   ");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(2); // @NotBlank and @Pattern both fail on blank string
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must not be blank"));
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"));
    }

    @Test
    @DisplayName("should fail validation when phone number format is invalid")
    void testValidation_PhoneNumberInvalidFormat() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("1234567890");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Phone number must be valid (e.g., 0xxxxxxxxx or +84xxxxxxxxx)"));
    }

    @Test
    @DisplayName("should pass validation when phone number starts with 0 (10 digits)")
    void testValidation_PhoneNumberValid_PrefixZero() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("01234567890");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("should pass validation when phone number starts with +84 (10 digits)")
    void testValidation_PhoneNumberValid_Plus84() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("+841234567890");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }

    // --- City name field tests ---

    @Test
    @DisplayName("should fail validation when city name is blank")
    void testValidation_CityNameBlank() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("   ");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("City name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when city name exceeds 255 characters")
    void testValidation_CityNameExceedsMaxSize() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("A".repeat(256));
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("City name must not exceed 255 characters"));
    }

    // --- Ward name field tests ---

    @Test
    @DisplayName("should fail validation when ward name is blank")
    void testValidation_WardNameBlank() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("   ");
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Ward name must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when ward name exceeds 255 characters")
    void testValidation_WardNameExceedsMaxSize() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("A".repeat(256));
        dto.setDeliveryAddress("123 Main Street");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Ward name must not exceed 255 characters"));
    }

    // --- Delivery address field tests ---

    @Test
    @DisplayName("should fail validation when delivery address is blank")
    void testValidation_DeliveryAddressBlank() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("   ");

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Delivery address must not be blank"));
    }

    @Test
    @DisplayName("should fail validation when delivery address exceeds 255 characters")
    void testValidation_DeliveryAddressExceedsMaxSize() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("A".repeat(256));

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).hasSize(1);
        assertThat(violations).anyMatch(v -> v.getMessage().equals("Delivery address must not exceed 255 characters"));
    }

    // --- Hide field has no validation, so no need to test ---

    @Test
    @DisplayName("should accept any boolean value for hide field")
    void testValidation_HideFieldAcceptsAnyBoolean() {
        UserAddressUpdateRequestDTO dto = new UserAddressUpdateRequestDTO();
        dto.setReceiver("John Doe");
        dto.setPhoneNumber("0123456789");
        dto.setCityName("Ho Chi Minh");
        dto.setWardName("District 1");
        dto.setDeliveryAddress("123 Main Street");
        dto.setHide(false);

        Set<ConstraintViolation<UserAddressUpdateRequestDTO>> violations = validator.validate(dto);
        assertThat(violations).isEmpty();
    }
}


