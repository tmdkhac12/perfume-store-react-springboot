package com.example.perfume_store.modules.invoice.repository;

import com.example.perfume_store.modules.invoice.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    Page<Invoice> findAll(Specification<Invoice> specification, Pageable pageable);
}
