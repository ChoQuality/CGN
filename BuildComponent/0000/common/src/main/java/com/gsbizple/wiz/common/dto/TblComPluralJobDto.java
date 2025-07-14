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
public class TblComPluralJobDto {

    // 겸직ID
    private Integer jobPluralId;
    // 사용자KEY
    private Integer userKey;
    // 기업아이디
    private Integer corporateId;
    // 소속팀
    private Integer orgKey;
    // 소속팀
    private String orgCd;
    // 조직코드 경로
    private String orgCdPath;
    // 조직명 경로
    private String orgNmPath;
    // 조직명
    private String orgNm;
    // 직위
    private String jobPosition;
    // 직책
    private String jobResponsibility;
    // 담당업무
    private String dutyInfo;
    // 사용여부
    private Integer useFlag;
    // 생성일시
    private String createDt;
    // 생성자
    private Integer createUserKey;
    // 수정일시
    private String updateDt;
    // 수정자
    private Integer updateUserKey;

}
