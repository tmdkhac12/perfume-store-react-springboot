package com.example.perfume_store.modules.invoice.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsResponseDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice_details.InvoiceDetails;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

class InvoiceMapperTest {

    private InvoiceMapper invoiceMapper;

    @BeforeEach
    void setUp() {
        invoiceMapper = new InvoiceMapperImpl();
    }

    @Test
    @DisplayName("toPublicResponse: Should map Invoice Entity to InvoicePublicResponseDTO")
    void toPublicResponse_Success() {
        // Arrange
        Invoice invoice = createInvoice(1);

        // Act
        InvoicePublicResponseDTO result = invoiceMapper.toPublicResponse(invoice);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(invoice.getId());
        assertThat(result.getTotal()).isEqualByComparingTo(invoice.getTotal());
        assertThat(result.getReceiverName()).isEqualTo(invoice.getReceiverName());
        assertThat(result.getPhoneNumber()).isEqualTo(invoice.getPhoneNumber());
        assertThat(result.getShippingAddress()).isEqualTo(invoice.getShippingAddress());
        assertThat(result.getDeliveryStatus()).isEqualTo(invoice.getDeliveryStatus());
        assertThat(result.getPaymentMethod()).isEqualTo(invoice.getPaymentMethod());
        assertThat(result.getCreatedAt()).isEqualTo(invoice.getCreatedAt());
    }

    @Test
    @DisplayName("toInvoiceDetailsResponse: Should map Invoice Entity and details to InvoiceDetailsResponseDTO")
    void toInvoiceDetailsResponse_Success() {
        // Arrange
        Invoice invoice = createInvoice(1);
        InvoiceDetails detail1 = createInvoiceDetail(1, invoice);
        InvoiceDetails detail2 = createInvoiceDetail(2, invoice);
        invoice.setInvoiceDetails(List.of(detail1, detail2));

        // Act
        InvoiceDetailsResponseDTO result = invoiceMapper.toInvoiceDetailsResponse(invoice);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(invoice.getId());
        assertThat(result.getInvoiceDetails()).hasSize(2);
        assertThat(result.getInvoiceDetails().get(0).getPerfumeName()).isEqualTo(detail1.getPerfumeName());
        assertThat(result.getInvoiceDetails().get(1).getPerfumeName()).isEqualTo(detail2.getPerfumeName());
    }

    @Test
    @DisplayName("toInvoiceDetailsDTO: Should map InvoiceDetails Entity to InvoiceDetailsDTO")
    void toInvoiceDetailsDTO_Success() {
        // Arrange
        InvoiceDetails detail = createInvoiceDetail(1, null);

        // Act
        InvoiceDetailsDTO result = invoiceMapper.toInvoiceDetailsDTO(detail);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getQuantity()).isEqualTo(detail.getQuantity());
        assertThat(result.getBuyPrice()).isEqualByComparingTo(detail.getBuyPrice());
        assertThat(result.getPerfumeName()).isEqualTo(detail.getPerfumeName());
        assertThat(result.getVolumeName()).isEqualTo(detail.getVolumeName());
    }

    @Test
    @DisplayName("toPageResponse: Should map Page of Invoices to PageResponse")
    void toPageResponse_Success() {
        // Arrange
        List<Invoice> invoices = List.of(createInvoice(1), createInvoice(2));
        Page<Invoice> invoicePage = new PageImpl<>(invoices, PageRequest.of(0, 10), invoices.size());

        // Act
        PageResponse<InvoicePublicResponseDTO> result = invoiceMapper.toPageResponse(invoicePage);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(2);
        assertThat(result.getPage()).isEqualTo(0); 
        assertThat(result.getTotalElements()).isEqualTo(2);
    }

    // Helpers
    private Invoice createInvoice(int id) {
        Invoice invoice = new Invoice();
        invoice.setId(id);
        invoice.setTotal(new BigDecimal("100.00"));
        invoice.setReceiverName("John Doe");
        invoice.setPhoneNumber("0123456789");
        invoice.setShippingAddress("123 Street");
        invoice.setDeliveryStatus(DeliveryStatus.Pending);
        invoice.setPaymentMethod(PaymentMethod.Cash);
        invoice.setCreatedAt(LocalDateTime.now());
        return invoice;
    }

    private InvoiceDetails createInvoiceDetail(int id, Invoice invoice) {
        InvoiceDetails detail = new InvoiceDetails();
        detail.setId(id);
        detail.setInvoice(invoice);
        detail.setQuantity(2);
        detail.setBuyPrice(new BigDecimal("50.00"));
        detail.setPerfumeName("Test Perfume " + id);
        detail.setVolumeName(50.0);
        return detail;
    }
}
