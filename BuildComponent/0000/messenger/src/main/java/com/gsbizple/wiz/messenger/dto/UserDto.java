package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.spec.LoginStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Integer userKey; //사용자KEY

    private Integer orgKey; //소속팀KEY

    private String orgNm; //소속팀명

    private Integer corporateId; //기업아이디

    private String userId; //사용자ID

    private String userNm; //사용자명

    private String thumbImgType; //썸네일이미지유형

    private String thumbImgPath; //썸네일이미지경로

    private LoginStatus loginStatus; // 로그인상태

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime loginDt; //로그인일시

    private String email; //e메일

    private String positionCd; //직위명

    private String responsibilityCd; //직책명

    private String mobilePhoneNo; //휴대전화번호

    private String officePhoneNo; //사무실전화번호

    private String empNo; //사번

    private String authCd; //권한코드

    private Integer useFlag; //사용여부

    private String orgPath; //조직Path

    private String orgPathNm; //조직Path명

    public UserDto(Integer userKey, String userNm, String orgNm) {
        this.userKey = userKey;
        this.userNm = userNm;
        this.orgNm = orgNm;
    }
}
