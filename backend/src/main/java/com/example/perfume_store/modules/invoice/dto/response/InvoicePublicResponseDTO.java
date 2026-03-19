package com.example.perfume_store.modules.invoice.dto.response;

import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InvoicePublicResponseDTO {

    private int id;

    private LocalDateTime createdAt;

    private BigDecimal total;

    private String receiverName, phoneNumber, shippingAddress;

    private DeliveryStatus deliveryStatus;

    private PaymentMethod paymentMethod;

}
