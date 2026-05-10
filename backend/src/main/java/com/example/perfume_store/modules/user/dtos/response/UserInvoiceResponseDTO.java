package com.example.perfume_store.modules.user.dtos.response;

import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class UserInvoiceResponseDTO {
    private int id;
    private LocalDateTime createdAt;
    private BigDecimal total;
    private DeliveryStatus deliveryStatus;
    private List<String> itemPreviews;
    private int totalItems;
}
