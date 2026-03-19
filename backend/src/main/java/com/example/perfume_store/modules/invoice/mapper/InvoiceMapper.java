package com.example.perfume_store.modules.invoice.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import com.example.perfume_store.modules.invoice.entity.Invoice;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    InvoicePublicResponseDTO toPublicResponse(Invoice invoice);

    PageResponse<InvoicePublicResponseDTO> toPageResponse(Page<Invoice> invoicePage);
}
