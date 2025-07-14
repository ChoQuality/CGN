package com.gsbizple.wiz.common.spec;

import lombok.Getter;

/**
 * 내부 사용 템플릿만 정의
 * 템플릿 정보는 messengerDB의 tbl_alarm_template 테이블 참고
 */
@Getter
public enum TemplateCode {
    //좋아요 템플릿
    PRAISE_IMG_01("PRAISE_IMG_01", "좋아요 템플릿1"),
    PRAISE_IMG_02("PRAISE_IMG_02", "좋아요 템플릿2"),
    PRAISE_IMG_03("PRAISE_IMG_03", "좋아요 템플릿3"),
    PRAISE_IMG_04("PRAISE_IMG_04", "좋아요 템플릿4"),

    //TO-DO 템플릿
    TODO_REGIST_REP("TODO_REGIST_REP", "TODO 등록 템플릿(담당자)"),
    TODO_MODIFY_ALL("TODO_MODIFY_ALL", "TODO 변경 템플릿(전체)"),
    TODO_ACCEPT_REQ("TODO_ACCEPT_REQ", "TODO 수락 템플릿(요청자)"),
    TODO_REJECT_REQ("TODO_REJECT_REQ", "TODO 거절 템플릿(요청자)"),
    TODO_ACCEPT_REP("TODO_ACCEPT_REP", "TODO 수락 템플릿(담당자)"),
    TODO_REJECT_REP("TODO_REJECT_REP", "TODO 거절 템플릿(담당자)"),
    TODO_D0_DAY_REP("TODO_D0_DAY_REP", "TODO 당일 종료 템플릿(담당자)"),
    TODO_DN_DAY_REP("TODO_DN_DAY_REP", "TODO 몇일전 템플릿(담당자)"),
    TODO_RE_REQUEST_REP("TODO_RE_REQUEST_REP", "TODO 재요청 템플릿(담당자)"),
    TODO_DELETE_ALL("TODO_DELETE_ALL", "TODO 삭제 템플릿(전체)"),
    ;

    private final String code;
    private final String description;

    TemplateCode(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
