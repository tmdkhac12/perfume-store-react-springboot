package com.example.perfume_store.modules.invoice.service;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.perfume.Gender;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.perfume.PerfumeSpecification;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import com.example.perfume_store.modules.invoice.entity.Invoice;
import com.example.perfume_store.modules.invoice.entity.InvoiceSpecification;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import com.example.perfume_store.modules.invoice.mapper.InvoiceMapper;
import com.example.perfume_store.modules.invoice.repository.InvoiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    public PageResponse<InvoicePublicResponseDTO> getPaginatedInvoices(
            int page, int limit,
            String searchKey,
            LocalDateTime fromDate, LocalDateTime toDate,
            BigDecimal fromTotal, BigDecimal toTotal,
            DeliveryStatus deliveryStatus,
            PaymentMethod paymentMethod,
            String orderBy
    ) {
        // Handle Sort
        Sort sort = Sort.by("createdAt").descending();

        Pageable pageable = PageRequest.of(page - 1, limit, sort);
        Specification<Invoice> specification = InvoiceSpecification.filterInvoices(
                searchKey,
                fromDate, toDate,
                fromTotal, toTotal,
                deliveryStatus,
                paymentMethod
        );

        Page<Invoice> invoices = invoiceRepository.findAll(specification, pageable);
        return invoiceMapper.toPageResponse(invoices);
    }
}
