package com.gsbizple.wiz.common.spec.todo;

import lombok.Getter;

@Getter
public enum AwpTodoStatus {
    CANCEL("C","취소"),
    FINISH("F", "종료"),
    PROCESSING("P", "진행"),
    REJECT("R", "거절"),
    START("S", "시작");


    private final String code;
    private final String description;

    AwpTodoStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
