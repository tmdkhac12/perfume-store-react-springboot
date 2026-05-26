package com.example.perfume_store.modules.invoice.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.user.User;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@ExtendWith(MockitoExtension.class)
class MailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private TemplateEngine templateEngine;

    @InjectMocks
    private MailService mailService;

    @Test
    @DisplayName("sendInvoiceConfirmation: Should send email successfully")
    void sendInvoiceConfirmation_Success() {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");

        Invoice invoice = new Invoice();
        invoice.setId(1);
        invoice.setUser(user);

        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(templateEngine.process(eq("mail/invoice-confirmation"), any(Context.class))).thenReturn("<html>Test</html>");

        // Act
        mailService.sendInvoiceConfirmation(invoice);

        // Assert
        verify(mailSender).send(mimeMessage);
        verify(templateEngine).process(eq("mail/invoice-confirmation"), any(Context.class));
    }
}
