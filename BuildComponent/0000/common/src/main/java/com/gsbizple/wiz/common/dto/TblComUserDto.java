package com.gsbizple.wiz.common.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gsbizple.wiz.common.spec.portlet.EmploymentType;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TblComUserDto {

    // 사용자KEY
    private Integer userKey;
    // 사용자ID
    private String userId;
    // 비밀번호
    @JsonIgnore
    private String userPassword;
    // 사용자명
    private String userNm;
    // 썸네일이미지유형
    private String thumbImgType;
    // 썸네일이미지경로
    private String thumbImgPath;
    // 이메일
    private String email;
    // 직위명
    private String jobPosition;
    // 직책명
    private String jobResponsibility;
    // 사번
    private String empNo;
    // 조직코드
    private String orgCd;
    // 조직코드 경로
    private String orgCdPath;
    // 조직명 경로
    private String orgNmPath;
    // 조직명
    private String orgNm;
    // 로그인 상태 ( LOGIN / LOGOFF / AWAY(자리비움) )
    private String loginStatus;
    // 로그인 일시
    private String loginDt;
    // 휴대 전화번호
    private String mobilePhoneNo;
    // 회사 전화번호
    private String officePhoneNo;
    // 조직KEY
    private Integer orgKey;

    // 하위조직 수.
    private Integer childOrgDepth; // CHILD_ORG_DEPTH
    // 권한코드
    private String authCd;
    // 입사일
    private String hireDate;
    // 고용형태
    private EmploymentType employmentType;

    @JsonIgnore
    private String userType; // 사용자 유형 (U: 일반 사용자, A:Admin )
    @JsonIgnore
    private Integer pluralJobCnt; // 겸직 개서
    // 겸직 목록
    private List<TblComPluralJobDto> pluralJobList;
    // 사용여부
    @JsonIgnore
    private Integer useFlag;
    // 생성일시
    @JsonIgnore
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDt;
    // 생성자
    @JsonIgnore
    private Integer createUserKey;

    @JsonGetter("employmentTypeNm")
    public String getEmploymentTypeNm() {
        return employmentType != null ? employmentType.getDescription() : null;
    }

    @JsonGetter("isAdminYn")
    public Boolean getIsAdminYn() {
        return "A".equals(userType);
    }

}
