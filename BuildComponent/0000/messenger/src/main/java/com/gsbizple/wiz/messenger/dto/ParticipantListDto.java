package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantListDto {

    private String roomId; //채팅방ID

    private Integer userKey; //사용자KEY

    private String userNm; //사용자명

    private Integer corporateId; //기업아이디

    private String orgPath; //조직Path

    private String orgPathNm; //조직Path명

    private String loginStatus; //로그인상태

    private String thumbImgPath; //이미지경로

}
