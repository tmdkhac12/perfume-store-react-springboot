package com.example.perfume_store.modules.invoice.event;

import com.example.perfume_store.modules.invoice.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class InvoiceEventListener {

    private final MailService mailService;

    @Async
    @EventListener
    public void handleInvoiceCreatedEvent(InvoiceCreatedEvent event) {
        log.info("Handling InvoiceCreatedEvent for invoice #{}", event.getInvoice().getId());
        mailService.sendInvoiceConfirmation(event.getInvoice());
    }
}
