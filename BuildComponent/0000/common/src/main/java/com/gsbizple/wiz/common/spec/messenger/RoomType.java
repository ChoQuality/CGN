package com.gsbizple.wiz.common.spec.messenger;

import lombok.Getter;

@Getter
public enum RoomType {
    SELF("SELF", "나와 대화"),
    PRIVATE("PRIVATE", "1대1 대화"),
    GROUP("GROUP", "단체 대화"),
    ALARM("ALARM", "알림 대화"),
    DOROTHY("DOROTHY", "AI 대화"),
    ;

    private final String code;
    private final String description;

    RoomType(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
