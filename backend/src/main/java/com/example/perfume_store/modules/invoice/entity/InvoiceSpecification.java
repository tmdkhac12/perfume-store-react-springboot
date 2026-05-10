package com.example.perfume_store.modules.invoice.entity;

import com.example.perfume_store.domain.invoice.Invoice;
import com.example.perfume_store.modules.invoice.enums.DeliveryStatus;
import com.example.perfume_store.modules.invoice.enums.PaymentMethod;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class InvoiceSpecification {
    public static Specification<Invoice> filterInvoices(
            String searchKey,
            LocalDateTime fromDate, LocalDateTime toDate,
            BigDecimal fromTotal, BigDecimal toTotal,
            DeliveryStatus deliveryStatus,
            PaymentMethod paymentMethod
    ) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. SearchKey (Like %...%) cho receiverName, phoneNumber, shippingAddress
            if (searchKey != null && !searchKey.isBlank()) {
                String keyword = "%" + searchKey.toLowerCase() + "%";
                Predicate searchPredicate = cb.or(
                        cb.like(cb.lower(root.get("receiverName")), keyword),
                        cb.like(cb.lower(root.get("phoneNumber")), keyword),
                        cb.like(cb.lower(root.get("shippingAddress")), keyword)
                );
                predicates.add(searchPredicate);
            }

            // Filter by createdAt
            if (fromDate != null) predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), fromDate));
            if (toDate != null) predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), toDate));

            // Filter by total
            if (fromTotal != null) predicates.add(cb.greaterThanOrEqualTo(root.get("total"), fromTotal));
            if (toTotal != null) predicates.add(cb.lessThanOrEqualTo(root.get("total"), toTotal));

            // Filter by DeliveryStatus
            if (deliveryStatus != null) {
                predicates.add(cb.equal(root.get("deliveryStatus"), deliveryStatus));
            }

            // Filter by PaymentMethod
            if (paymentMethod != null) {
                predicates.add(cb.equal(root.get("paymentMethod"), paymentMethod));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
