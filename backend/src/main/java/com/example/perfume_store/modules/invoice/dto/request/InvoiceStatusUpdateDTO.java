package com.example.perfume_store.modules.invoice.dto.request;

import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import lombok.Data;

@Data
public class InvoiceStatusUpdateDTO {
    private DeliveryStatus deliveryStatus;
}