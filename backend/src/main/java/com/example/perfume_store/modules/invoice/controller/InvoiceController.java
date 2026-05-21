package com.example.perfume_store.modules.invoice.controller;

import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.configs.security.SecurityContextGetter;
import com.example.perfume_store.modules.invoice.dto.request.InvoiceCreateRequestDTO;
import com.example.perfume_store.modules.invoice.dto.request.InvoiceStatusUpdateDTO;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import com.example.perfume_store.modules.invoice.service.InvoiceService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/invoices")
@AllArgsConstructor
@Validated
public class InvoiceController {

    private final InvoiceService invoiceService;

    private final SecurityContextGetter securityContextGetter;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceDetailsById(
            @PathVariable int id,
            HttpServletRequest request
    ) {
        var invoiceDetails = invoiceService.getInvoiceDetails(id);
        return ApiResponseFactory.success(invoiceDetails, "Invoice retrieved", HttpStatus.OK, request);
    }

    @PostMapping
    public ResponseEntity<?> createInvoice(
            @RequestBody InvoiceCreateRequestDTO invoiceCreateRequestDTO,
            HttpServletRequest request
    ) throws UnsupportedEncodingException {
        int userId = securityContextGetter.getUserId();

        var invoiceDetails = invoiceService.createInvoice(invoiceCreateRequestDTO, userId);
        return ApiResponseFactory.success(invoiceDetails, "Invoice retrieved", HttpStatus.OK, request);
    }

    // Endpoint for admin update an invoice's status
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(
            @PathVariable Integer id,
            @RequestBody InvoiceStatusUpdateDTO dto,
            HttpServletRequest request
    ) {
        var invoice = invoiceService.updateInvoiceStatus(id, dto.getDeliveryStatus());
        return ApiResponseFactory.success(invoice, "Update status successfully", HttpStatus.OK, request);
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancelInvoice(@PathVariable Integer id, HttpServletRequest request) {
        // Trong service bạn nên check xem hóa đơn này có thuộc về user đang đăng nhập không
        int userId = securityContextGetter.getUserId();

        var invoice = invoiceService.updateInvoiceStatusUser(id, userId);
        return ApiResponseFactory.success(invoice, "Invoice cancelled", HttpStatus.OK, request);
    }
}
