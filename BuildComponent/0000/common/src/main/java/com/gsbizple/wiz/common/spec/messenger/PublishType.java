package com.gsbizple.wiz.common.spec.messenger;

import lombok.Getter;

@Getter
public enum PublishType {
    ROOM("ROOM", "채팅방"),
    MESSAGE("MESSAGE", "메시지"),
    ALARM("ALARM", "알람"),
    EMOJI("EMOJI","이모지")
    ;

    private final String code;
    private final String description;

    PublishType(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
