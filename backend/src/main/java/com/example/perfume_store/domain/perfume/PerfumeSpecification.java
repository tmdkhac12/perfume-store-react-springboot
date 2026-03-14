package com.example.perfume_store.domain.perfume;

import com.example.perfume_store.domain.volume_perfume.VolumePerfume;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PerfumeSpecification {
    public static Specification<Perfume> filterPerfumes(String name, Gender gender, BigDecimal fromPrice, BigDecimal toPrice) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isBlank()) {
                predicates.add(cb.like(root.get("name"), "%" + name.toLowerCase() + "%"));
            }

            if (gender != null) {
                predicates.add(cb.equal(root.get("gender"), gender));
            }

            // Filter for price must be via VolumePerfume
            if (fromPrice != null || toPrice != null) {
                Join<Perfume, VolumePerfume> volumeJoin = root.join("volumePerfumes");

                if (fromPrice != null) {
                    predicates.add(cb.greaterThanOrEqualTo(volumeJoin.get("price"), fromPrice));
                }
                if (toPrice != null) {
                    predicates.add(cb.lessThanOrEqualTo(volumeJoin.get("price"), toPrice));
                }

                query.distinct(true); // Tránh trùng lặp khi Join
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
