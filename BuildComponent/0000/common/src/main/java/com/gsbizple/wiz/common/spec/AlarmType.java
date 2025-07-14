package com.gsbizple.wiz.common.spec;

import lombok.Getter;

@Getter
public enum AlarmType {
    PRAISE("PRAISE","칭찬하기"),
    NOTICE("NOTICE","단순알림"),
    INTERNAL_LINK("INTERNAL_LINK", "내부링크바로가기"),
    EXTERNAL_LINK("EXTERNAL_LINK","외부링크바로가기"),
    CONFIRM("CONFIRM","수락/거절알림")
    ;

    private final String code;
    private final String description;

    AlarmType(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
