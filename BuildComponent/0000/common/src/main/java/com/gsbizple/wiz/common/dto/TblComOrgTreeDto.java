package com.gsbizple.wiz.common.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TblComOrgTreeDto {
    
    // 조직 KEY
    private Integer groupId;
    // 조직명
    private String text;

    // 조직 코드
    private String orgCd;
    // 상위조직코드
    private String upperOrgCd;

    // Tree 하위 아이템 목록
    private List<TblComOrgTreeDto> children;
}
