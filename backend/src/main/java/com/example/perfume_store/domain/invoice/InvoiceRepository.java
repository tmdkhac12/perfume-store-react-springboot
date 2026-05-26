package com.example.perfume_store.domain.invoice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    Page<Invoice> findAll(Specification<Invoice> specification, Pageable pageable);

    Optional<Invoice> findByIdAndUserId(Integer id, Integer userId);

    Page<Invoice> findAllByUserId(int userId, Pageable pageable);

    @Query("SELECT i FROM Invoice i JOIN FETCH i.user JOIN FETCH i.invoiceDetails WHERE i.id = :id")
    Optional<Invoice> findByIdWithUserAndDetails(@Param("id") Integer id);
}
