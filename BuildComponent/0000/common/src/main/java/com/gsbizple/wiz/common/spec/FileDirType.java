package com.gsbizple.wiz.common.spec;

import lombok.Getter;

@Getter
public enum FileDirType {
    MSG("MSG", "messenger","메신저"),
    TODO("TODO", "TODO","TODO"),
    USER("USER", "USER","사용자용 파일"),
    ROOM("ROOM", "ROOM","채팅 룸 사용 이미지"),
    ETC("ETC", "ETC","기타 파일 저장");


    private final String code;
    private final String dirName;
    private final String description;

    FileDirType(String code, String dirName, String description) {
        this.code = code;
        this.dirName = dirName;
        this.description = description;
    }

}
