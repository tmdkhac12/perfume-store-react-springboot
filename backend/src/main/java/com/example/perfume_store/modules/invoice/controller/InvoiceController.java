package com.example.perfume_store.modules.invoice.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import com.example.perfume_store.modules.invoice.service.InvoiceService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/invoices")
@AllArgsConstructor
@Validated
public class InvoiceController {

    private final InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<?> getPaginatedInvoices(
            @RequestParam(defaultValue = "1")
            @Min(value = 1, message = "Page number must be greater than 1")
            int page,

            @RequestParam(defaultValue = "8")
            @Min(value = 1, message = "Page limit must be greater than 1")
            @Max(value = 100, message = "Page limit must be smaller than 100")
            int limit,

            @RequestParam(required = false) String searchKey,
            @RequestParam(required = false) LocalDateTime fromDate,
            @RequestParam(required = false) LocalDateTime toDate,
            @RequestParam(required = false) BigDecimal fromTotal,
            @RequestParam(required = false) BigDecimal toTotal,
            @RequestParam(required = false) DeliveryStatus deliveryStatus,
            @RequestParam(required = false) PaymentMethod paymentMethod,
            @RequestParam(required = false) String orderBy,

            HttpServletRequest request
    ) {
        var invoices = invoiceService.getPaginatedInvoices(
                page, limit,
                searchKey,
                fromDate, toDate,
                fromTotal, toTotal,
                deliveryStatus,
                paymentMethod,
                orderBy
        );
        return ApiResponseFactory.success(invoices, "Get paginated invoices successfully", HttpStatus.OK, request);
    }

}
