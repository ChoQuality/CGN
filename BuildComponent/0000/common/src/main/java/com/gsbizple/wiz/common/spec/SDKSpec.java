package com.gsbizple.wiz.common.spec;

import lombok.Getter;

@Getter
public enum SDKSpec {
    //todo 0~999 공통 오류 부분
    SUCCESS(0,"SUCCESS")
    ,FAIL_JWT_INIT(1,"JWT_INIT_FAILED")
    ,JWT_EXPIRED(2,"JWT_EXPIRED")
    ,FAIL_JWT_VALID(3,"JWT_VALID_FAIL")
    ,FAIL_LOGIN(4,"LOGIN_FAIL")
    ,FAIL_LOAD_HTML(5,"LOAD_HTML_FAIL")
    ,FAIL_LOAD_HTML_DATA(6,"LOAD_HTML_DATA_FAIL")
    ,FAIL_WEBCLIENT_GET(7,"WEBCLIENT_GET_FAIL")
    ,FAIL_WEBCLIENT_POST(8,"WEBCLIENT_POST_FAIL")
    ,FAIL_LAYOUT_SERVICE_SET_DATA(10,"Data is not an instance of the specified dataType")
    ,UNSUPPORTED(9,"UNSUPPORTED")
    ,FAIL_REALTIME_API(10, "AI연동에 실패하였습니다.")
    ,ERROR_LOGIN_ID(11,"ERROR_LOGIN_ID")
    ,FAIL(99,"FAIL")
    ,ERROR(999,"ERROR")
    //todo 1000~1999 메신저 오류 부분
    ,USER_EMPTY(1000, "USER_EMPTY")
    ,ROOM_EMPTY(1001, "ROOM_EMPTY")
    ,PARTICIPANT_EMPTY(1002, "PARTICIPANT_EMPTY")
    ,PARTICIPANT_NOT_EMPTY(1003, "PARTICIPANT_NOT_EMPTY")
    ,FIX_NOT_EMPTY(1004, "FIX_NOT_EMPTY")
    ,ATTACHMENT_EMPTY(1005, "ATTACHMENT_EMPTY")

    ,MESSAGE_ALREADY_PROCESSED(1006, "MESSAGE_ALREADY_PROCESSED")
    ,FAIL_MESSAGE_CONFIRM(1007, "FAIL_MESSAGE_CONFIRM")

    ,FILE_UPLOAD_FAIL(1100, "FILE_UPLOAD_FAIL")
    ,FILE_CAPACITY_EXCEEDED(1101, "FILE_CAPACITY_EXCEEDED")
    ,FILE_NOT_ALLOWED(1102, "FILE_NOT_ALLOWED")
    ,FILE_NOT_FOUND(1103, "FILE_NOT_FOUND")

    ,FAIL_TO_GET_LOCK(1200,"분산락 획득 실패")
    ,FAIL_ROOM_SYNC(1201,"사용자 채팅방 목록 동기화 실패 ")
    ,FAIL_READ_REDIS_MESSAGE(1202,"redis message 읽기 실패")



    ,FAIL_ALARM_TEMPLATE_EMPTY(1300, "등록되지 않은 템플릿 코드입니다.")
    ,FAIL_ALARM_TEMPLATE_BODY_PARSING(1301, "요청 받은 본문 내용 형식이 잘못 되었습니다.")
    ,FAIL_ALARM_MESSAGE_SEARCH(1302, "알림메시지 조회에 실패하였습니다.")


    ,FAIL_MESSAGE_SAVE(1401, "메시지 저장 실패")
    ,FAIL_MESSAGE_FETCH(1402, "메시지 조회 실패")
    ,FAIL_MESSAGE_PAGE_FETCH(1403, "페이징 메시지 조회 실패")
    ,FAIL_MESSAGE_LAST_MESSAGE_FETCH(1404, "마지막 메시지 조회 실패")
    ,FAIL_MESSAGE_KEYWORD_SEARCH(1405, "키워드 메시지 검색 실패")
    ,FAIL_MESSAGE_KEYWORD_COUNT_FETCH(1406, "키워드 검색 건수 조회 실패")
    ,FAIL_MESSAGE_READ_UPDATE(1407, "읽은 메시지 ID 업데이트 실패")
    ,FAIL_MESSAGE_READ_DELETE(1408, "읽은 메시지 ID 삭제 실패")
    ,FAIL_MESSAGE_READ_FETCH(1409, "읽은 메시지 ID 조회 실패")
    ,FAIL_MESSAGE_DELETE(1410, "메시지 삭제 실패")
    ,FAIL_MESSAGE_REPLY_SAVE(1411, "답글 저장 실패")
    ,FAIL_ALARM_SAVE(1412, "알림 저장 실패")
    ,FAIL_ALARM_FETCH(1413, "알림 조회 실패")
    ,FAIL_ALARM_READ_FETCH(1414, "읽은 알림 조회 실패")
    ,FAIL_ALARM_READ_UPDATE(1415, "읽은 알림 업데이트 실패")
    ,FAIL_ALARM_MESSAGE_DISCARD(1416, "알림 메시지 삭제 실패")
    ,FAIL_ALARM_CONFIRM_PROC(1417, "알림 처리 실패")
    ,FAIL_FILE_LIST_FETCH(1418, "첨부파일 목록 조회 실패")
    ,FAIL_FILE_UPLOAD(1419, "파일 업로드 실패")
    ,FAIL_FILE_DOWNLOAD(1420, "파일 다운로드 실패")
    ,FAIL_GROUP_FETCH(1421, "조직 정보 조회 실패")
    ,FAIL_GROUP_NAME_FETCH(1422, "조직명 조회 실패")
    ,FAIL_GROUP_USER_LIST_FETCH(1423, "조직 사용자 목록 조회 실패")
    ,FAIL_CHATROOM_CREATE(1424, "채팅방 생성 실패")
    ,FAIL_CHATROOM_FETCH(1425, "채팅방 조회 실패")
    ,FAIL_CHATROOM_PARTICIPATION_FETCH(1426, "채팅 참여 조회 실패")
    ,FAIL_CHATROOM_SEARCH(1427, "채팅방 키워드 검색 실패")
    ,FAIL_CHATROOM_UPDATE(1428, "채팅방 정보 수정 실패")
    ,FAIL_CHATROOM_DUPLICATE_CHECK(1429, "중복 체크 실패")
    ,FAIL_CHATROOM_THUMBNAIL_UPDATE(1430, "썸네일 변경 실패")
    ,FAIL_CHATROOM_PIN_SET(1431, "채팅 핀 고정 실패")
    ,FAIL_CHATROOM_PIN_UNSET(1432, "채팅 핀 해제 실패")
    ,FAIL_CHATROOM_PIN_ORDER_UPDATE(1433, "핀 순서 변경 실패")
    ,FAIL_USER_FETCH(1434, "사용자 정보 조회 실패")
    ,FAIL_USER_SEARCH(1435, "사용자 검색 실패")
    ,FAIL_REDIS_CHANNEL_ADD(1436, "Redis 채널 추가 실패")
    ,FAIL_REDIS_PUBLISH(1437, "Redis 메시지 발행 실패")
    ,FAIL_REDIS_NOTICE_PUBLISH(1438, "Redis 알림 발행 실패")
    ,FAIL_PARTICIPANT_SAVE(1439, "참가자 정보 저장 실패")
    ,FAIL_PARTICIPANT_LIST_SAVE(1440, "참가자 리스트 저장 실패")
    ,FAIL_PARTICIPANT_FETCH(1441, "참가자 정보 조회 실패")
    ,FAIL_PARTICIPANT_UPDATE(1442, "참가자 정보 수정 실패")
    ,FAIL_CHATROOM_CREATE_DEFAULT(1443,"기본 채팅방 생성 실패")
    ,FAIL_CHATROOM_CREATE_ALL_DEFAULT(1444,"모든 사용자의 기본 채팅방 생성 실패")
    ,FAIL_UNREAD_MESSAGE_FETCH(1445, "안 읽은 메시지 조회 실패")

    ,FAIL_KEYCLOAK_CLIENT_INFO_FETCH(1446,"키클락 클라이언트 정보 조회 실패")
    ,FAIL_DOROTHY_RESPONSE(1447,"도로시 응답 실패")

    ,FAIL_WEBSOCKET_SEND_MESSAGE(1500,"websocket 메시지 발송 실패")
    ,FAIL_WEBSOCKET_INVALID_DTO(1501,"websocket 유효하지 않은 DTO")

    ,FAIL_EMOJI_CREATE(1510,"이모지 생성 실패")
    ,FAIL_EMOJI_FIND(1511,"이모지 조회 실패")
    ,FAIL_EMOJI_DELETE(1512,"이모지 삭제 실패")
    ,FAIL_MESSAGE_EMOJI_YN_UPDATE(1513,"이모지 사용여부 업데이트 실패")
    ,FAIL_EMOJI_FIND_GROUP(1514,"이모지 그룹 소회 실패")


    ,FAIL_VIEW_CHAT_LIST(1999,"CHAT LIST 오류")

    //todo 2000~2999 todo 오류 부 공통 오류 ( 2000~2099 )
    ,FAIL_TODO_EMPTY_TODO_ID(2000, "TODO ID는 필수 값입니다.")
    ,FAIL_TODO_GET_USER_LIST(2011, "TODO 담당자 목록 조회 실패")
    ,FAIL_TODO_GET_ORG_LIST(2012, "TOOD 조직도 조회 실패")

    // TODO 등록 및 수정 관련 2100~2199
    ,FAIL_TODO_REGIST(2101, "TODO 등록 실패")
    ,FAIL_TODO_UPDATE(2102, "TODO 수정 실패")
    ,FAIL_TODO_DELETE(2103, "TODO 삭제 실패")
    ,FAIL_TODO_RE_REQUET(2104, "TODO 재요청 실패")
    ,FAIL_TODO_CONFIRM(2105, "TODO 확인 실패")
    ,FAIL_TODO_REJECT(2106, "TODO 거절 실패")
    ,FAIL_TODO_GET_DETAIL(2107, "TODO 상세 조회 실패")
    ,FAIL_TODO_GET_LIST(2108, "TODO 목록 조회 실패")

    ,FAIL_TODO_CONFIRM_STATUS(2111, "TODO Confirm 할 수 있는 상태가 아닙니다.")
    ,FAIL_TODO_REJECT_STATUS(2112, "TODO Reject 할 수 있는 상태가 아닙니다.")
    ,FAIL_ALARM_SEND(2199, "알림 전송 실패")

    // TODO 진척률 수정 관련 2200~2299
    ,FAIL_TODO_NOT_REQ(2200, "해당 담당자가 없습니다.")
    ,FAIL_TODO_RATIO(2201, "완료율의 범위가 아닙니다.(0-100)")

    // TODO 주간보고서 처리 관련 2300~2399
    ,FAIL_WK_REPORT_LIST(2301, "주간 업무보고서 목록 조회 실패")
    ,FAIL_WK_REPORT_REGIST(2302, "주간 업무보고서 신규 작성 실패")
    ,FAIL_WK_REPORT_GET_DETAIL(2303, "주간 업무보고서 상세 조회 실패")
    ,FAIL_WK_REPORT_UPDATE(2304, "주간 업무보고서 수정 실패")
    ,FAIL_WK_REPORT_DELETE(2305, "주간 업무보고서 삭제 실패")

    ,FAIL_WK_REPORT_MERGE(2306, "주간 업무보고서 합치기 실패")
    ,FAIL_WK_REPORT_AUTO_ROAD(2307, "주간 업무보고서 자동 불러오기 실패")
    ,FAIL_MAKE_WEEKLY_LIST(2308, "주간보고 주차 리스트 조회 실패")
    ,FAIL_CREATE_AI_WEEKLY_REPORT(2309, "주간보고 내용 불러오기 실패")
    ,FAIL_CREATE_AI_GENERAL_REPORT(2310, "일반보고 내용 불러오기 실패")
    ,FAIL_SELECT_GENERAL_REPORT(2310, "일반보고 내용 불러오기 실패")
    ,FAIL_SELECT_MERGE_REPORT(2311, "뽀꼬써 하ㅃ하끼 몪롞 쪼회 씰퍠")

    // TODO 일반보고서 처리 관련 2400~2499
    ,FAIL_REPORT_LIST(2401, "일반 업무보고서 목록 조회 실패")
    ,FAIL_REPORT_REGIST(2402, "일반 업무보고서 신규 작성 실패")
    ,FAIL_REPORT_GET_DETAIL(2403, "일반 업무보고서 상세 조회 실패")
    ,FAIL_REPORT_UPDATE(2404, "일반 업무보고서 수정 실패")
    ,FAIL_REPORT_DELETE(2405, "일반 업무보고서 삭제 실패")

    ,FAIL_REPORT_AUTO_ROAD(2406, "일반 업무보고서 자동 불러오기 실패")

    // TODO 대시보드 조회 관련 2500~2599
    ,FAIL_DASHBOARD_TODO_SITUATION(2501, "팀원별 진행현황 조회 실패")
    ,FAIL_DASHBOARD_TODO_LIST(2502, "팀원 상세 TO-DO 목록 조회 실패")

    ,FAIL_DASHBOARD_MONTHLY_KEYWORD(2511, "이달의 키워드 조회 실패")
    ,FAIL_DASHBOARD_MONTHLY_KEYWORD_DOWNLOAD(2512, "이달의 키워드 다운로드 실패")

    // TODO 대시보드 칭찬하기 조회 관련 2500~2599
    ,FAIL_PRAISE_SEND_MONTHLY(2521, "내가 보낸 월별 칭찬 조회 실패")
    ,FAIL_PRAISE_RECEIVE_MONTHLY(2522, "내가 받은 월별 칭찬 조회 실패")
    ,FAIL_PRAISE_LIST(2523, "칭찬하기 현황(전사) 조회 실패")
    ,FAIL_PRAISE_LIST_DOWNLOAD(2524, "칭찬하기 현황(전사) 다운로드 조회 실패")
    ,FAIL_VIEW_PRAISE_NORMAL(2525, "칭찬하기 현황 오류")

    // 포틀릿 조회 및 저장 관련 3000 ~ 3999
    ,FAIL_PORTLET_GET_LIST(3001, "개인화 포틀릿 목록 조회 실패")
    ,FAIL_PORTLET_GET_LIST_ALL(3002, "전체 포틀릿 목록 조회 실패")
    ,FAIL_PORTLET_SET_LIST(3003, "개인화 포틀릿 목록 저장 실패")
    // 포틀릿-TODO 3101 ~ 3199
    ,FAIL_PORTLET_TODO_LIST(3101, "포틀릿 - 개인 TO-DO 목록 조회 실패")
    //  포틀릿 MY-LINK (3201 _ 3299
    ,FAIL_PORTLET_GET_PRIVATE_MYLINK(3201, "MyLink 개인 목록 조회 실패")
    ,FAIL_PORTLET_GET_ALL_MYLINK(3202, "MyLink 전체 목록 조회 실패")
    ,FAIL_PORTLET_SET_PRIVATE_MYLINK(3203, "MyLink 개인 목록 설정 실패")
    // 포틀릿-연동 3201 ~ 3299
    ,FAIL_PORTLET_SCHEDULE_LIST(3301, "포틀릿 - 개인 일정 조회 실패")
    ,FAIL_PORTLET_GET_APPROVAL_LIST(3302, "전자결재 관련 항목 조회 실패")
    ,FAIL_PORTLET_GET_RESOURCE_PLAN_LIST(3303, "자원 예약 현황 조회 실패")
    ,FAIL_PORTLET_GET_BOARD_LIST(3304, "게시판 형태의 포틀릿 조회 실패")
    ,FAIL_PORTLET_GET_ANNUAL_LEVE_INFO(3305, "HR 연차현황 조회 실패")
    ,FAIL_VIEW_PORTLET_USER(3306, "포틀릿 유저 설정화면 오류")

    // Home API 처리
    , FAIL_HOME_GET_USER_LIST (4001, "사용자 목록 조회 실패")
    , FAIL_HOME_GET_USER_INFO (4002, "사용자 상세 정보 조회 실패")
    , FAIL_HOME_GET_USER_IMAGE (4003, "이미지 상세 조회 실패")
    , FAIL_HOME_CHANGE_USER_STATUS (4004, "사용자 상태 변경 실패")
    , FAIL_HOME_SET_USER_INFO (4005, "사용자 상세 정보 수정 실패")
    , FAIL_HOME_UPDATE_MY_INFO (4006, "개인 상세 정보 수정 실패")
    , FAIL_HOME_GET_ORG_TREE (4007, "조직도 정보 조회 실패")
    , FAIL_HOME_UPDATE_PASSWORD (4008, "비밀번호 변경 실패")
    
    ,ALARM_API_FAIL(3305, "HR 연차현황 조회 실패");

   private final int code;
   private final String message;
   SDKSpec(int code, String msg) {
        this.code = code;
        this.message = msg;
   }

}
