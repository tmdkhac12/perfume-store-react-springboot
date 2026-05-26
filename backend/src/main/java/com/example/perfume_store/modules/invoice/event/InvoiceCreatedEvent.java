package com.example.perfume_store.modules.invoice.event;

import com.example.perfume_store.domain.invoice.Invoice;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class InvoiceCreatedEvent extends ApplicationEvent {
    private final Invoice invoice;

    public InvoiceCreatedEvent(Object source, Invoice invoice) {
        super(source);
        this.invoice = invoice;
    }
}
