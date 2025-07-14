package com.gsbizple.wiz.messenger.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class PaginationData {
    private final Long totalCount;
    private final List<?> contents;

    public PaginationData(List<?> contents, long totalCount) {
        this.contents = contents;
        this.totalCount = totalCount;
    }

}
