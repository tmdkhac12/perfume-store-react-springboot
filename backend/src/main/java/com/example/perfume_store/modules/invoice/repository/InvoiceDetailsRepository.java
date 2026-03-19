package com.example.perfume_store.modules.invoice.repository;

import com.example.perfume_store.modules.invoice.entity.InvoiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Integer> {
}
