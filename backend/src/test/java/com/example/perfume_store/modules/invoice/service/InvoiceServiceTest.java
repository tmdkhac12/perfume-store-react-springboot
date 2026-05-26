package com.example.perfume_store.modules.invoice.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

import com.example.perfume_store.common.exceptions.NotFoundException;
import com.example.perfume_store.common.response.PageResponse;
import com.example.perfume_store.domain.address.Address;
import com.example.perfume_store.domain.address.AddressRepository;
import com.example.perfume_store.domain.perfume.Perfume;
import com.example.perfume_store.domain.user.User;
import com.example.perfume_store.domain.user.UserRepository;
import com.example.perfume_store.domain.volume.Volume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import com.example.perfume_store.domain.volume_perfume.VolumePerfumeRepository;
import com.example.perfume_store.modules.invoice.dto.request.InvoiceCreateRequestDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoiceDetailsResponseDTO;
import com.example.perfume_store.modules.invoice.dto.response.InvoicePublicResponseDTO;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice_details.InvoiceDetails;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import com.example.perfume_store.modules.invoice.mapper.InvoiceMapper;
import com.example.perfume_store.domain.invoice_details.InvoiceDetailsRepository;
import com.example.perfume_store.domain.invoice.InvoiceRepository;
import com.example.perfume_store.modules.invoice.event.InvoiceCreatedEvent;
import com.example.perfume_store.modules.payment.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class InvoiceServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;
    @Mock
    private InvoiceDetailsRepository invoiceDetailsRepository;
    @Mock
    private AddressRepository addressRepository;
    @Mock
    private VolumePerfumeRepository volumePerfumeRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private InvoiceMapper invoiceMapper;
    @Mock
    private VNPayService vnPayService;
    @Mock
    private HttpServletRequest httpServletRequest;
    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private InvoiceService invoiceService;

    // --- Private Helper Methods (Data Factories) ---

    private Invoice createInvoice(int id, DeliveryStatus status, PaymentMethod method) {
        Invoice invoice = new Invoice();
        invoice.setId(id);
        invoice.setDeliveryStatus(status);
        invoice.setPaymentMethod(method);
        invoice.setTotal(new BigDecimal("100.00"));
        invoice.setReceiverName("John Doe");
        invoice.setPhoneNumber("0123456789");
        invoice.setShippingAddress("123 Street, Ward 1, City X");
        invoice.setCreatedAt(LocalDateTime.now());
        return invoice;
    }

    private InvoiceDetails createInvoiceDetail(int id, Invoice invoice, String perfumeName, double volumeName, int quantity, BigDecimal price) {
        InvoiceDetails detail = new InvoiceDetails();
        detail.setId(id);
        detail.setInvoice(invoice);
        detail.setPerfumeName(perfumeName);
        detail.setVolumeName(volumeName);
        detail.setQuantity(quantity);
        detail.setBuyPrice(price);
        return detail;
    }

    private Address createAddress(int id, String receiver, String phoneNumber) {
        Address address = new Address();
        address.setId(id);
        address.setReceiver(receiver);
        address.setPhoneNumber(phoneNumber);
        address.setDeliveryAddress("456 Avenue");
        address.setWardName("Ward 1");
        address.setCityName("City X");
        return address;
    }

    private User createUser(int id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    private VolumePerfume createVolumePerfume(int id, BigDecimal price, String perfumeName, double volume) {
        VolumePerfume vp = new VolumePerfume();
        vp.setId(id);
        vp.setPrice(price);

        Perfume perfume = new Perfume();
        perfume.setName(perfumeName);
        vp.setPerfume(perfume);

        Volume v = new Volume();
        v.setVolume(volume);
        vp.setVolume(v);

        return vp;
    }

    private InvoiceCreateRequestDTO createInvoiceCreateRequestDTO(Integer addressId, PaymentMethod method, Integer vpId, Integer quantity) {
        InvoiceCreateRequestDTO request = new InvoiceCreateRequestDTO();
        request.setAddressId(addressId);
        request.setPaymentMethod(method);
        
        InvoiceCreateRequestDTO.CartItemDTO item = new InvoiceCreateRequestDTO.CartItemDTO();
        item.setVolumePerfumeId(vpId);
        item.setQuantity(quantity);
        
        request.setItems(List.of(item));
        return request;
    }

    // --- getInvoiceDetails ---

    @Test
    @DisplayName("getInvoiceDetails: Should return InvoiceDetailsResponseDTO when invoice exists")
    void getInvoiceDetails_Success() {
        // Arrange
        int invoiceId = 1;
        Invoice invoice = createInvoice(invoiceId, DeliveryStatus.Pending, PaymentMethod.Cash);
        InvoiceDetailsResponseDTO expectedResponse = new InvoiceDetailsResponseDTO();
        expectedResponse.setId(invoiceId);

        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(invoice));
        when(invoiceMapper.toInvoiceDetailsResponse(invoice)).thenReturn(expectedResponse);

        // Act
        InvoiceDetailsResponseDTO result = invoiceService.getInvoiceDetails(invoiceId);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(invoiceId);
        verify(invoiceRepository).findById(invoiceId);
        verify(invoiceMapper).toInvoiceDetailsResponse(invoice);
    }

    @Test
    @DisplayName("getInvoiceDetails: Should throw NotFoundException when invoice does not exist")
    void getInvoiceDetails_NotFound() {
        // Arrange
        int invoiceId = 1;
        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.getInvoiceDetails(invoiceId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Invoice not found");
        
        verify(invoiceRepository).findById(invoiceId);
        verifyNoInteractions(invoiceMapper);
    }

    // --- getPaginatedInvoices ---

    @Test
    @DisplayName("getPaginatedInvoices: Should return PageResponse of invoices")
    @SuppressWarnings("unchecked")
    void getPaginatedInvoices_Success() {
        // Arrange
        int page = 1;
        int limit = 10;
        List<Invoice> invoiceList = List.of(createInvoice(1, DeliveryStatus.Pending, PaymentMethod.Cash));
        Page<Invoice> invoicePage = new PageImpl<>(invoiceList);
        PageResponse<InvoicePublicResponseDTO> expectedResponse = new PageResponse<>();

        when(invoiceRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(invoicePage);
        when(invoiceMapper.toPageResponse(invoicePage)).thenReturn(expectedResponse);

        // Act
        PageResponse<InvoicePublicResponseDTO> result = invoiceService.getPaginatedInvoices(
                page, limit, null, null, null, null, null, null, null, null
        );

        // Assert
        assertThat(result).isNotNull();
        verify(invoiceRepository).findAll(any(Specification.class), any(Pageable.class));
        verify(invoiceMapper).toPageResponse(invoicePage);
    }

    // --- updateInvoiceStatus ---

    @Test
    @DisplayName("updateInvoiceStatus: Should update status when invoice is not cancelled")
    void updateInvoiceStatus_Success() {
        // Arrange
        int invoiceId = 1;
        DeliveryStatus newStatus = DeliveryStatus.Shipped;
        Invoice invoice = createInvoice(invoiceId, DeliveryStatus.Pending, PaymentMethod.Cash);

        InvoicePublicResponseDTO expectedResponse = new InvoicePublicResponseDTO();
        expectedResponse.setDeliveryStatus(newStatus);

        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(invoice));
        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(invoiceMapper.toPublicResponse(any(Invoice.class))).thenReturn(expectedResponse);

        // Act
        InvoicePublicResponseDTO result = invoiceService.updateInvoiceStatus(invoiceId, newStatus);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getDeliveryStatus()).isEqualTo(newStatus);
        assertThat(invoice.getDeliveryStatus()).isEqualTo(newStatus);
        verify(invoiceRepository).findById(invoiceId);
        verify(invoiceRepository).save(invoice);
    }

    @Test
    @DisplayName("updateInvoiceStatus: Should throw IllegalStateException when invoice is already cancelled")
    void updateInvoiceStatus_Cancelled() {
        // Arrange
        int invoiceId = 1;
        Invoice invoice = createInvoice(invoiceId, DeliveryStatus.Cancelled, PaymentMethod.Cash);

        when(invoiceRepository.findById(invoiceId)).thenReturn(Optional.of(invoice));

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.updateInvoiceStatus(invoiceId, DeliveryStatus.Shipped))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Cannot update a cancelled invoice");

        verify(invoiceRepository).findById(invoiceId);
        verify(invoiceRepository, never()).save(any());
    }

    // --- updateInvoiceStatusUser ---

    @Test
    @DisplayName("updateInvoiceStatusUser: Should cancel invoice when it is pending")
    void updateInvoiceStatusUser_Success() {
        // Arrange
        int invoiceId = 1;
        int userId = 100;
        Invoice invoice = createInvoice(invoiceId, DeliveryStatus.Pending, PaymentMethod.Cash);

        InvoicePublicResponseDTO expectedResponse = new InvoicePublicResponseDTO();
        expectedResponse.setDeliveryStatus(DeliveryStatus.Cancelled);

        when(invoiceRepository.findByIdAndUserId(invoiceId, userId)).thenReturn(Optional.of(invoice));
        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(invoiceMapper.toPublicResponse(any(Invoice.class))).thenReturn(expectedResponse);

        // Act
        InvoicePublicResponseDTO result = invoiceService.updateInvoiceStatusUser(invoiceId, userId);

        // Assert
        assertThat(result).isNotNull();
        assertThat(result.getDeliveryStatus()).isEqualTo(DeliveryStatus.Cancelled);
        assertThat(invoice.getDeliveryStatus()).isEqualTo(DeliveryStatus.Cancelled);
        verify(invoiceRepository).findByIdAndUserId(invoiceId, userId);
        verify(invoiceRepository).save(invoice);
    }

    @Test
    @DisplayName("updateInvoiceStatusUser: Should throw IllegalStateException when invoice is not pending")
    void updateInvoiceStatusUser_NotPending() {
        // Arrange
        int invoiceId = 1;
        int userId = 100;
        Invoice invoice = createInvoice(invoiceId, DeliveryStatus.Shipped, PaymentMethod.Cash);

        when(invoiceRepository.findByIdAndUserId(invoiceId, userId)).thenReturn(Optional.of(invoice));

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.updateInvoiceStatusUser(invoiceId, userId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("Cannot cancel invoice in Shipped status");

        verify(invoiceRepository).findByIdAndUserId(invoiceId, userId);
        verify(invoiceRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateInvoiceStatusUser: Should throw NotFoundException when invoice not found for user")
    void updateInvoiceStatusUser_NotFound() {
        // Arrange
        int invoiceId = 1;
        int userId = 100;
        when(invoiceRepository.findByIdAndUserId(invoiceId, userId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.updateInvoiceStatusUser(invoiceId, userId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Invoice not found");

        verify(invoiceRepository).findByIdAndUserId(invoiceId, userId);
    }

    // --- createInvoice ---

    @Test
    @DisplayName("createInvoice: Should create invoice and details successfully")
    void createInvoice_Success() throws UnsupportedEncodingException {
        // Arrange
        Integer userId = 1;
        InvoiceCreateRequestDTO request = createInvoiceCreateRequestDTO(10, PaymentMethod.Cash, 20, 2);

        Address address = createAddress(10, "Jane Doe", "0987654321");
        User user = createUser(userId);
        VolumePerfume vp = createVolumePerfume(20, new BigDecimal("50.00"), "Chanel No.5", 100.0);

        when(addressRepository.findById(10)).thenReturn(Optional.of(address));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(volumePerfumeRepository.findById(20)).thenReturn(Optional.of(vp));
        when(invoiceRepository.save(any(Invoice.class))).thenAnswer(inv -> inv.getArgument(0));

        InvoiceDetailsResponseDTO expectedResponse = new InvoiceDetailsResponseDTO();
        when(invoiceMapper.toInvoiceDetailsResponse(any(Invoice.class))).thenReturn(expectedResponse);

        // Act
        InvoiceDetailsResponseDTO result = invoiceService.createInvoice(request, userId);

        // Assert
        assertThat(result).isNotNull();
        verify(invoiceRepository).save(argThat(invoice -> {
            assertThat(invoice.getUser()).isEqualTo(user);
            assertThat(invoice.getTotal()).isEqualByComparingTo(new BigDecimal("100.00"));
            assertThat(invoice.getReceiverName()).isEqualTo("Jane Doe");
            assertThat(invoice.getShippingAddress()).contains("456 Avenue").contains("Ward 1").contains("City X");
            return true;
        }));
        verify(invoiceDetailsRepository).saveAll(anyList());
        verify(eventPublisher).publishEvent(any(InvoiceCreatedEvent.class));
    }

    @Test
    @DisplayName("createInvoice: Should throw NotFoundException when address not found")
    void createInvoice_AddressNotFound() {
        // Arrange
        InvoiceCreateRequestDTO request = createInvoiceCreateRequestDTO(10, PaymentMethod.Cash, 20, 2);
        when(addressRepository.findById(10)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.createInvoice(request, 1))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Address not found");
    }

    @Test
    @DisplayName("createInvoice: Should throw NotFoundException when user not found")
    void createInvoice_UserNotFound() {
        // Arrange
        InvoiceCreateRequestDTO request = createInvoiceCreateRequestDTO(10, PaymentMethod.Cash, 20, 2);
        when(addressRepository.findById(10)).thenReturn(Optional.of(createAddress(10, "Jane", "123")));
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.createInvoice(request, 1))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("User not found");
    }

    @Test
    @DisplayName("createInvoice: Should throw NotFoundException when volume perfume not found")
    void createInvoice_VolumePerfumeNotFound() {
        // Arrange
        Integer userId = 1;
        InvoiceCreateRequestDTO request = createInvoiceCreateRequestDTO(10, PaymentMethod.Cash, 20, 2);

        when(addressRepository.findById(10)).thenReturn(Optional.of(createAddress(10, "Jane", "123")));
        when(userRepository.findById(userId)).thenReturn(Optional.of(createUser(userId)));
        when(volumePerfumeRepository.findById(20)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> invoiceService.createInvoice(request, userId))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Volume Perfume not found");
    }
}
