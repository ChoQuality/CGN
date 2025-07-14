package com.gsbizple.wiz.common.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TblComOrgDto {

    // 조직KEY
    private Integer orgKey;
    // 조직 코드
    private String orgCd;
    // 기업아이디
    private Integer corporateId;
    // 조직Path
    private String orgPath;
    // 조직Path
    private String orgNmPath;
    // 조직Path
    private String orgCdPath;
    // 상위조직코드
    private String upperOrgCd;
    // 조직명
    private String orgNm;
    // 조직구분
    private String orgType;
    // 순서
    private Integer sortOrder;
    // 사용여부
    private Integer useFlag;
    // Depth
    private Integer lvl;
    // 생성일시
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDt;
    // 생성자
    private Integer createUserKey;

}
