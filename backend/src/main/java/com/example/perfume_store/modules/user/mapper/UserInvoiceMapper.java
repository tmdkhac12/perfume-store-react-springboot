package com.example.perfume_store.modules.user.mapper;

import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice_details.InvoiceDetails;
import com.example.perfume_store.modules.user.dtos.response.UserInvoiceResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserInvoiceMapper {

    @Mapping(target = "itemPreviews", source = "invoiceDetails", qualifiedByName = "mapItemPreviews")
    @Mapping(target = "totalItems", source = "invoiceDetails", qualifiedByName = "mapTotalItems")
    UserInvoiceResponseDTO toUserInvoiceResponse(Invoice invoice);

    PageResponse<UserInvoiceResponseDTO> toUserInvoicePageResponse(Page<Invoice> invoicePage);

    @Named("mapItemPreviews")
    default List<String> mapItemPreviews(List<InvoiceDetails> invoiceDetails) {
        return invoiceDetails.stream()
                .map(detail -> detail.getVolumePerfume().getPerfume().getSampleImages().get(0).getPath())
                .collect(Collectors.toList());
    }

    @Named("mapTotalItems")
    default int mapTotalItems(List<InvoiceDetails> invoiceDetails) {
        return invoiceDetails.size();
    }
}
