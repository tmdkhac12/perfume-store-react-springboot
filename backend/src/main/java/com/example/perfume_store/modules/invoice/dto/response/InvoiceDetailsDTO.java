package com.example.perfume_store.modules.invoice.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class InvoiceDetailsDTO {
    private int quantity;

    private BigDecimal buyPrice;

    private String perfumeName;

    private double volumeName;
}
