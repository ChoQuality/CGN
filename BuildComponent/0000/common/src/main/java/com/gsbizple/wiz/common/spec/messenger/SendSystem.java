package com.gsbizple.wiz.common.spec.messenger;

import lombok.Getter;

@Getter
public enum SendSystem {
    MESSENGER("MESSENGER", "메신저"),
    TODO("TODO", "TODO"),
    SCHEDULE("SCHEDULE", "스케줄"),
    ADMIN("ADMIN", "어드민"),
    ;

    private final String code;
    private final String description;

    SendSystem(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
