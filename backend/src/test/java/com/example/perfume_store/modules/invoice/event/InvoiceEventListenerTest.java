package com.example.perfume_store.modules.invoice.event;

import static org.mockito.Mockito.*;

import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.modules.invoice.service.MailService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class InvoiceEventListenerTest {

    @Mock
    private MailService mailService;

    @InjectMocks
    private InvoiceEventListener invoiceEventListener;

    @Test
    @DisplayName("handleInvoiceCreatedEvent: Should call mailService")
    void handleInvoiceCreatedEvent_Success() {
        // Arrange
        Invoice invoice = new Invoice();
        invoice.setId(1);
        InvoiceCreatedEvent event = new InvoiceCreatedEvent(this, invoice);

        // Act
        invoiceEventListener.handleInvoiceCreatedEvent(event);

        // Assert
        verify(mailService).sendInvoiceConfirmation(invoice);
    }
}
