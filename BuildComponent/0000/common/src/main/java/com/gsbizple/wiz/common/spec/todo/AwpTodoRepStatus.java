package com.gsbizple.wiz.common.spec.todo;

import lombok.Getter;

@Getter
public enum AwpTodoRepStatus {
    CANCEL("C","취소"),
    FINISH("F", "종료"),
    PROCESSING("P", "진행(확인 된 경우)"),
    REJECT("R", "거절"),
    START("S", "시작(수신)");


    private final String code;
    private final String description;

    AwpTodoRepStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
