package com.example.perfume_store.modules.invoice.dto.request;

import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class InvoiceCreateRequestDTO {
    private Integer addressId;
    private PaymentMethod paymentMethod;
    private List<CartItemDTO> items;

    @Data
    public static class CartItemDTO {
        private Integer volumePerfumeId;
        private Integer quantity;
    }
}