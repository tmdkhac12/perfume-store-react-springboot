package com.example.perfume_store.modules.invoice.service;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.address.Address;
import com.example.perfume_store.domain.address.AddressRepository;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfumeRepository;
import com.example.perfume_store.modules.invoice.dto.request.InvoiceCreateRequestDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsResponseDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import com.example.perfume_store.modules.invoice.entity.Invoice;
import com.example.perfume_store.modules.invoice.entity.InvoiceDetails;
import com.example.perfume_store.modules.invoice.entity.InvoiceSpecification;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import com.example.perfume_store.modules.invoice.mapper.InvoiceMapper;
import com.example.perfume_store.modules.invoice.repository.InvoiceDetailsRepository;
import com.example.perfume_store.modules.invoice.repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceDetailsRepository invoiceDetailsRepository;
    private final AddressRepository addressRepository;
    private final VolumePerfumeRepository volumePerfumeRepository;
    private final UserRepository userRepository;

    private final InvoiceMapper invoiceMapper;

    // Getter for entities
    private Invoice getInvoiceByIdEntity(int id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice not found"));
    }

    private Address getAddressByIdEntity(int id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Address not found"));
    }

    private VolumePerfume getVolumePerfumeByIdEntity(int id) {
        return volumePerfumeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Volume Perfume not found"));
    }

    private User getUserByIdEntity(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    // Methods
    public InvoiceDetailsResponseDTO getInvoiceDetails(int invoiceId) {
        Invoice invoice = getInvoiceByIdEntity(invoiceId);
        return invoiceMapper.toInvoiceDetailsResponse(invoice);
    }

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

    @Transactional
    public InvoiceDetailsResponseDTO createInvoice(InvoiceCreateRequestDTO request, Integer userId) {
        // Check if an address is valid
        Address address = getAddressByIdEntity(request.getAddressId());

        // Create basic information
        Invoice invoice = new Invoice();
        invoice.setUser(getUserByIdEntity(userId));
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setDeliveryStatus(DeliveryStatus.Pending);
        invoice.setPaymentMethod(request.getPaymentMethod());
        invoice.setReceiverName(address.getReceiver());
        invoice.setPhoneNumber(address.getPhoneNumber());
        invoice.setShippingAddress(address.getDeliveryAddress() + ", " + address.getWardName() + ", " + address.getCityName());

        // Calculate invoice details
        BigDecimal total = BigDecimal.ZERO;
        List<InvoiceDetails> detailsList = new ArrayList<>();

        for (var item : request.getItems()) {
            // Get cart item, audit with database and set details
            VolumePerfume vp = getVolumePerfumeByIdEntity(item.getVolumePerfumeId());

            InvoiceDetails detail = new InvoiceDetails();
            detail.setVolumePerfume(vp);
            detail.setQuantity(item.getQuantity());
            detail.setBuyPrice(vp.getPrice());
            detail.setPerfumeName(vp.getPerfume().getName());
            detail.setVolumeName(vp.getVolume().getVolume());

            // Calculate total for a cart item
            BigDecimal itemTotal = vp.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(itemTotal);
            detailsList.add(detail);
        }

        // Save invoice
        invoice.setTotal(total);
        Invoice savedInvoice = invoiceRepository.save(invoice);

        // Save invoice details
        detailsList.forEach(d -> d.setInvoice(savedInvoice));
        invoiceDetailsRepository.saveAll(detailsList);

        savedInvoice.setInvoiceDetails(detailsList);
        return invoiceMapper.toInvoiceDetailsResponse(savedInvoice);
    }
}
