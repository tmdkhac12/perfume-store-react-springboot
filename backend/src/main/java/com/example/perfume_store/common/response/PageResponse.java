package com.example.perfume_store.common.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> content;

    private boolean first, last;

    private int page, size;

    private long totalElements, totalPages;
}
