package com.gsbizple.wiz.common.spec.todo;

import lombok.Getter;

@Getter
public enum AwpWeeklyReportSearchType {
    ALL("ALL","전체"),
    REPORT_NAME("REPORT_NAME", "보고서명"),
    CONTENTS("CONTENTS", "내용");


    private final String code;
    private final String description;

    AwpWeeklyReportSearchType(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
