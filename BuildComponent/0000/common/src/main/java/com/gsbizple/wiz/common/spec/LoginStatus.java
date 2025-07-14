package com.gsbizple.wiz.common.spec;

import lombok.Getter;

@Getter
public enum LoginStatus {
    LOGIN("LOGIN","온라인"),
    LOGOFF("LOGOFF", "오프라인"),
    AWAY("AWAY", "자리비움"),
    ETC("ETC", "기타");


    private final String code;
    private final String description;

    LoginStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }

}
