package com.gsbizple.wiz.common.spec.todo;

import lombok.Getter;

@Getter
public enum ReportStatusType {

    DRAFT("DRAFT","작성중"),
    FAILED("FAILED","작성실패"),
    COMPLETED("COMPLETED","작성완료");

    private final String code;
    private final String description;

    ReportStatusType(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
