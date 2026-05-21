package com.example.perfume_store.modules.payment.controller;

import com.example.perfume_store.common.response.ApiResponse;
import com.example.perfume_store.common.utils.ApiResponseFactory;
import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.domain.invoice.InvoiceRepository;
import com.example.perfume_store.modules.invoice.enums.PaymentStatus;
import com.example.perfume_store.modules.payment.service.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class VNPayController {

    private final VNPayService vnPayService;
    private final InvoiceRepository invoiceRepository;

    @GetMapping("/vnpay-return")
    public ResponseEntity<?> vnpayReturn(HttpServletRequest request) {
        Map<String, String> fields = new HashMap<>();
        for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements(); ) {
            String fieldName = params.nextElement();
            String fieldValue = request.getParameter(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        boolean isValidSignature = vnPayService.verifyCallback(fields);
        String vnp_ResponseCode = fields.get("vnp_ResponseCode");
        String invoiceIdStr = fields.get("vnp_TxnRef");
        
        Map<String, String> result = new HashMap<>();
        result.put("invoiceId", invoiceIdStr);
        result.put("responseCode", vnp_ResponseCode);

        if (isValidSignature) {
            if ("00".equals(vnp_ResponseCode)) {
                result.put("message", "Payment Successful");
                return ApiResponseFactory.success(result, "Payment successful", org.springframework.http.HttpStatus.OK, request);
            } else {
                result.put("message", "Payment Failed");
                return ApiResponseFactory.error(org.springframework.http.HttpStatus.BAD_REQUEST, "Payment failed", request);
            }
        } else {
            return ApiResponseFactory.error(org.springframework.http.HttpStatus.BAD_REQUEST, "Invalid signature", request);
        }
    }

    @GetMapping("/vnpay-ipn")
    public Map<String, String> vnpayIpn(@RequestParam Map<String, String> params) {
        Map<String, String> response = new HashMap<>();
        
        try {
            boolean isValidSignature = vnPayService.verifyCallback(new HashMap<>(params));
            if (isValidSignature) {
                int invoiceId = Integer.parseInt(params.get("vnp_TxnRef"));
                Invoice invoice = invoiceRepository.findById(invoiceId).orElse(null);

                if (invoice != null) {
                    // Check if amount is correct (amount in VNPay is USD * exchangeRate * 100)
                    long vnpAmount = Long.parseLong(params.get("vnp_Amount"));
                    long exchangeRate = 25000;
                    long invoiceAmount = invoice.getTotal()
                            .multiply(java.math.BigDecimal.valueOf(exchangeRate))
                            .multiply(java.math.BigDecimal.valueOf(100))
                            .longValue();

                    if (vnpAmount == invoiceAmount) {
                        if (invoice.getPaymentStatus() == PaymentStatus.Pending) {
                            if ("00".equals(params.get("vnp_ResponseCode"))) {
                                invoice.setPaymentStatus(PaymentStatus.Paid);
                            } else {
                                invoice.setPaymentStatus(PaymentStatus.Failed);
                            }
                            invoice.setVnpayTransactionId(params.get("vnp_TransactionNo"));
                            invoiceRepository.save(invoice);

                            response.put("RspCode", "00");
                            response.put("Message", "Confirm Success");
                        } else {
                            response.put("RspCode", "02");
                            response.put("Message", "Order already confirmed");
                        }
                    } else {
                        response.put("RspCode", "04");
                        response.put("Message", "Invalid Amount");
                    }
                } else {
                    response.put("RspCode", "01");
                    response.put("Message", "Order not found");
                }
            } else {
                response.put("RspCode", "97");
                response.put("Message", "Invalid Checksum");
            }
        } catch (Exception e) {
            response.put("RspCode", "99");
            response.put("Message", "Unknown Error");
        }
        
        return response;
    }
}
