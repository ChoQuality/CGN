package com.gsbizple.wiz.common.spec.messenger;

import lombok.Getter;

import java.util.EnumSet;

@Getter
public enum MessageType {
    JOIN("JOIN", "초대"),
    ENTER("ENTER", "입장"),
    EXPORT("EXPORT", "내보내기"),
    EXIT("EXIT", "나가기"),
    TALK("TALK", "메세지"),
    UPDATE("UPDATE", "수정하기"),
    DISCARD("DISCARD", "삭제노티"),

    PRAISE_IMG_01("PRAISE_IMG_01", "칭찬이미지1"),
    PRAISE_IMG_02("PRAISE_IMG_02", "칭찬이미지2"),
    PRAISE_IMG_03("PRAISE_IMG_03", "칭찬이미지3"),
    PRAISE_IMG_04("PRAISE_IMG_04", "칭찬이미지4"),

    NOTICE("NOTICE", "단순알림"),
    INTERNAL_LINK("INTERNAL_LINK", "내부링크바로가기"),
    EXTERNAL_LINK("EXTERNAL_LINK","외부링크바로가기"),
    CONFIRM("CONFIRM", "수락/거절알림"),

    EMOJI("EMOJI", "이모지");

    private final String code;
    private final String description;

    MessageType(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

    private static final EnumSet<MessageType> PRAISE_MESSAGES = EnumSet.of(
            PRAISE_IMG_01, PRAISE_IMG_02, PRAISE_IMG_03, PRAISE_IMG_04
    );

    public boolean isPraiseMessage() {
        return PRAISE_MESSAGES.contains(this);
    }

    private static final EnumSet<MessageType> JOIN_ENTER_MESSAGES = EnumSet.of(
            JOIN, ENTER
    );

    public boolean isJoinEnterMessage() {
        return JOIN_ENTER_MESSAGES.contains(this);
    }

    public boolean isUpdateMessage() {
        return this == UPDATE;
    }
}
