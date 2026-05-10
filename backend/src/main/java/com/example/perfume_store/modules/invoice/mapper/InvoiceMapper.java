package com.example.perfume_store.modules.invoice.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice_details.InvoiceDetails;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsResponseDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    InvoicePublicResponseDTO toPublicResponse(Invoice invoice);

    PageResponse<InvoicePublicResponseDTO> toPageResponse(Page<Invoice> invoicePage);

    InvoiceDetailsDTO toInvoiceDetailsDTO(InvoiceDetails invoiceDetails);

    InvoiceDetailsResponseDTO toInvoiceDetailsResponse(Invoice invoice);
}
