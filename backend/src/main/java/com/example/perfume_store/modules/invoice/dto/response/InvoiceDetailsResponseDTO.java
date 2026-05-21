package com.example.perfume_store.modules.invoice.dto.response;

import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import com.example.perfume_store.modules.invoice.enums.PaymentStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class InvoiceDetailsResponseDTO {

    private int id;

    private LocalDateTime createdAt;

    private BigDecimal total;

    private String receiverName, phoneNumber, shippingAddress;

    private DeliveryStatus deliveryStatus;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private String checkoutUrl;

    private List<InvoiceDetailsDTO> invoiceDetails;
}
