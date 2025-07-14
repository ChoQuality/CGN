package com.gsbizple.wiz.common.spec.todo;

import lombok.Getter;

@Getter
public enum ReportSearchType {
    ALL("ALL","전체"),
    REPORT_NAME("REPORT_NAME", "보고서명"),
    CONTENTS("CONTENTS", "내용");
    ;


    private final String code;
    private final String description;

    ReportSearchType(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
