package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.spec.AlarmType;
import com.gsbizple.wiz.common.spec.messenger.SendSystem;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDto {

    private long messageId; //메시지ID

    private String roomId; //채팅방ID

    private Integer sendUserKey; //보낸사용자KEY

    private SendSystem sendSystem; //알림요청시스템

    private Integer receiveUserKey; //받는사용자KEY

    private AlarmType alarmType; //알림Type

    private String templateCode; //메시지템플릿코드

    private String templateBody; //알림발송요청문구(String JSON)

    private String templateMessage; //템플릿메시지

    private String messageText; //메시저(plain Text - 메시지 검색용)

    private String praiseMsg; //칭찬메시지

    private String messageContent; //메시지컨텐츠

    private String linkText; //링크버튼명

    private String linkUrl; //링크URL

    private String acceptUrl; //수락URL

    private String rejectUrl; //거절URL

    private String confirmYn; //확인상태코드[Y:수락, N:거절, null:대기]

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime confirmDt; // 확인일시

    private String deletedYn; //삭제상태

    private Integer createUserKey; //생성자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt; //생성일시

    private Integer modifyUserKey; //수정자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifyDt; //수정일시

    private String keyword; //메시지 조회

    private String language; //템플릿언어코드

    private String company;

    // 날짜 변환이 먼저 필요한 부분 으로 추가
    private String createDtFormatted;
    private String modifyDtFormatted;
}
