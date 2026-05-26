package com.example.perfume_store.modules.invoice.service;

import com.example.perfume_store.domain.invoice.Invoice;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public void sendInvoiceConfirmation(Invoice invoice) {
        log.info("Preparing to send invoice confirmation email for invoice #{}", invoice.getId());
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message, 
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, 
                    StandardCharsets.UTF_8.name()
            );

            Context context = new Context();
            context.setVariable("invoice", invoice);
            String html = templateEngine.process("mail/invoice-confirmation", context);

            helper.setTo(invoice.getUser().getEmail());
            helper.setSubject("Perfume E-commerce Order Confirmation #" + invoice.getId());
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Invoice confirmation email sent successfully for invoice #{}", invoice.getId());
        } catch (MessagingException e) {
            log.error("Failed to send invoice confirmation email for invoice #{}", invoice.getId(), e);
        }
    }
}
