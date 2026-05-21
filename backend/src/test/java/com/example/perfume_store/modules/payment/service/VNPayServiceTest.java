package com.example.perfume_store.modules.payment.service;

import com.example.perfume_store.configs.payment.VNPayConfig;
import com.example.perfume_store.domain.invoice.Invoice;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VNPayServiceTest {

    @Mock
    private VNPayConfig vnPayConfig;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private VNPayService vnPayService;

    @BeforeEach
    void setUp() {
        when(vnPayConfig.getTmnCode()).thenReturn("TMN_CODE");
        when(vnPayConfig.getHashSecret()).thenReturn("HASH_SECRET");
        when(vnPayConfig.getPayUrl()).thenReturn("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html");
        when(vnPayConfig.getReturnUrl()).thenReturn("http://localhost:5173/payment-result");
    }

    @Test
    @DisplayName("Should create a valid payment URL")
    void createPaymentUrl_ValidInvoice_ReturnsUrl() throws UnsupportedEncodingException {
        // Given
        Invoice invoice = new Invoice();
        invoice.setId(123);
        invoice.setTotal(new BigDecimal("1000000"));
        
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");

        // When
        String url = vnPayService.createPaymentUrl(invoice, request);

        // Then
        assertThat(url).contains("vnp_Amount=100000000");
        assertThat(url).contains("vnp_TxnRef=123");
        assertThat(url).contains("vnp_TmnCode=TMN_CODE");
        assertThat(url).contains("vnp_SecureHash=");
    }
}
