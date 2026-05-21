package com.example.perfume_store.modules.payment.service;

import com.example.perfume_store.configs.payment.VNPayConfig;
import com.example.perfume_store.configs.payment.VNPayUtil;
import com.example.perfume_store.domain.invoice.Invoice;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class VNPayService {

    private final VNPayConfig vnPayConfig;

    public String createPaymentUrl(Invoice invoice, HttpServletRequest request) throws UnsupportedEncodingException {
        // 1. Configure basic VNPay parameters
        String vnp_Version = "2.1.0"; // VNPay API version
        String vnp_Command = "pay";   // Payment command
        String vnp_OrderInfo = "Payment for invoice #" + invoice.getId(); // Payment description
        String vnp_OrderType = "other"; // Order type (fashion, electronics, etc.)
        String vnp_TxnRef = String.valueOf(invoice.getId()); // Order reference ID (unique per day)
        String vnp_IpAddr = VNPayUtil.getIpAddress(request); // User's IP address
        String vnp_TmnCode = vnPayConfig.getTmnCode();      // Merchant website code (provided by VNPay)

        // 2. Calculate payment amount
        // Convert from USD to VND (assumed exchange rate: 25,000 VND/USD)
        // VNPay requires the final amount to be multiplied by 100
        long exchangeRate = 25000;
        long amount = invoice.getTotal()
                .multiply(java.math.BigDecimal.valueOf(exchangeRate))
                .multiply(java.math.BigDecimal.valueOf(100))
                .longValue();

        // 3. Put parameters into a Map for processing
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND"); // Currency unit
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", "vn");    // Display language (vn/en)
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.getReturnUrl()); // URL to receive results from VNPay
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        // 4. Set transaction creation and expiration time
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15); // Expire after 15 minutes
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // 5. Sort parameters alphabetically (Required by VNPay)
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        // 6. Build query and hash strings
        // We separate hashData and query strings even though they are identical in this version.
        // In previous VNPay versions, hashData required raw values while query required encoded values.
        // Keeping them separate ensures backward compatibility and clarity.
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                // Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                // Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        // 7. Create Secure Hash signature using HMAC-SHA512 algorithm
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData.toString());

        // 8. Append signature to the URL and return the result
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        return vnPayConfig.getPayUrl() + "?" + queryUrl;
    }

    public boolean verifyCallback(Map<String, String> fields) {
        // 1. Extract signature sent by VNPay
        String vnp_SecureHash = fields.get("vnp_SecureHash");

        // 2. Remove parameters that do not participate in the signature generation
        fields.remove("vnp_SecureHashType");
        fields.remove("vnp_SecureHash");

        // 3. Recompute the signature from remaining parameters
        String signValue = VNPayUtil.hashAllFields(fields, vnPayConfig.getHashSecret());

        // 4. Compare the recomputed signature with the one from VNPay
        return signValue.equals(vnp_SecureHash);
    }
}
