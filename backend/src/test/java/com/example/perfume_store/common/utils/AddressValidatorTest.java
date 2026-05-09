package com.example.perfume_store.common.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AddressValidatorTest {

    @Mock
    private ResourceLoader resourceLoader;

    private ObjectMapper objectMapper = new ObjectMapper();

    private AddressValidator addressValidator;

    @BeforeEach
    void setUp() throws IOException {
        String json = "[{\"name\": \"Thành phố Hà Nội\", \"wards\": [\"Phường Ba Đình\", \"Phường Ngọc Hà\"]}]";
        when(resourceLoader.getResource("classpath:data/provinces.json"))
                .thenReturn(new ByteArrayResource(json.getBytes()));

        addressValidator = new AddressValidator(resourceLoader, objectMapper);
        addressValidator.init();
    }

    @Test
    void validate_ValidCityAndWard_ShouldNotThrow() {
        assertThatCode(() -> addressValidator.validate("Thành phố Hà Nội", "Phường Ba Đình"))
                .doesNotThrowAnyException();
    }

    @Test
    void validate_InvalidCity_ShouldThrowIllegalArgumentException() {
        assertThatThrownBy(() -> addressValidator.validate("Invalid City", "Phường Ba Đình"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Invalid city name");
    }

    @Test
    void validate_InvalidWard_ShouldThrowIllegalArgumentException() {
        assertThatThrownBy(() -> addressValidator.validate("Thành phố Hà Nội", "Invalid Ward"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Invalid ward name");
    }
}
