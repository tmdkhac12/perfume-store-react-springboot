package com.example.perfume_store.modules.invoice.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice_details.InvoiceDetails;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsResponseDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import com.example.perfume_store.modules.perfume.entity.SampleImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    InvoicePublicResponseDTO toPublicResponse(Invoice invoice);

    PageResponse<InvoicePublicResponseDTO> toPageResponse(Page<Invoice> invoicePage);

    @Mapping(target = "concentration", source = "volumePerfume.perfume.concentration")
    @Mapping(target = "image", source = "volumePerfume.perfume.sampleImages", qualifiedByName = "mapFirstImagePath")
    InvoiceDetailsDTO toInvoiceDetailsDTO(InvoiceDetails invoiceDetails);

    InvoiceDetailsResponseDTO toInvoiceDetailsResponse(Invoice invoice);

    @Named("mapFirstImagePath")
    default String mapFirstImagePath(List<SampleImage> sampleImages) {
        if (sampleImages == null || sampleImages.isEmpty()) return null;
        return sampleImages.get(0).getPath();
    }
}
