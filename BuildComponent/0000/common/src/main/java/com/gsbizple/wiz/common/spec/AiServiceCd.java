package com.gsbizple.wiz.common.spec;

import lombok.Getter;

@Getter
public enum AiServiceCd {
    MSG_SUMMARY("MSG_SUMMARY", 1, "메신저 요약하기"),
    TODO_KEYWORD("TODO_KEYWORD", 2, "키워드 추출"),
    REPORT_WEEKLY("REPORT_WEEKLY", 3, "보고서 작성"),
    REPORT_MERGE("REPORT_MERGE", 4, "보고서 합치기"),
    MSG_DOROTHY("MSG_DOROTHY", 5, "헬프봇"),
    REPORT_NORMAL("REPORT_NORMAL", 6, "일반보고서 작성"),
    ;

    private final String code;
    private final int id;
    private final String description;

    AiServiceCd(String code, int id, String msg) {
        this.code = code;
        this.id = id;
        this.description = msg;
    }

}
