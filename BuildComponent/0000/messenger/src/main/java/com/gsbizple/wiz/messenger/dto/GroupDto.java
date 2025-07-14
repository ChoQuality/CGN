package com.gsbizple.wiz.messenger.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupDto {

    private Integer orgKey; //조직KEY

    private String orgCd; //조직 코드

    private Integer corporateId; //기업아이디

    private String orgPath; //조직Path

    private String upperOrgCd; //상위조직코드

    private String orgNm; //조직명

    private String orgType; //조직구분

    private Integer sortOrder; //순서

    private Integer useFlag; //사용여부

    private String corporateNm; //기업명

    private String corporateContact; //기업연락처

    private String orgPathNm; //조직Path명

    private String keyword; //검색키워드

}
