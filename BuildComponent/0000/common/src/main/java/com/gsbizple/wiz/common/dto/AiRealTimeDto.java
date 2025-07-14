package com.gsbizple.wiz.common.dto;

import lombok.*;

@Getter
@Setter
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiRealTimeDto {

    private Integer jobId; //작업ID

    private Integer aiServiceId; //AI서비스아이디

    private String aiServiceCd; //AI서비스코드

    private String jobExecType; //작업실행유형  // JobExecStatus

    private Integer jobExecUserKey; //작업수행자

    private String jobExecStatus; //작업상태[S:시작, F:정상종료, E:실패]

    private String jobResult; //작업결과

    private String aiServiceParam; //AI 전송 파라미터

    private String aiServiceResult; //AI 서비스 결과

    private Integer createUserKey; //생성자

}