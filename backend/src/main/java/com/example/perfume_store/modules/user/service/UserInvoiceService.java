package com.example.perfume_store.modules.user.service;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice.InvoiceRepository;
import com.example.perfume_store.modules.user.dtos.response.UserInvoiceResponseDTO;
import com.example.perfume_store.modules.user.mapper.UserInvoiceMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final UserInvoiceMapper userInvoiceMapper;

    public PageResponse<UserInvoiceResponseDTO> getInvoicesByUserId(int userId, int page, int limit) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        Page<Invoice> invoices = invoiceRepository.findAllByUserId(userId, pageable);
        return userInvoiceMapper.toUserInvoicePageResponse(invoices);
    }
}
