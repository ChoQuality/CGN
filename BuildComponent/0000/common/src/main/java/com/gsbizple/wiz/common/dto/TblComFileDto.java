package com.gsbizple.wiz.common.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gsbizple.wiz.common.spec.FileDirType;
import lombok.*;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TblComFileDto {

    // File ID
    private Integer fileId;
    // 파일사용유형
    @JsonIgnore
    private String fileUseFlag;
    // File UUID
    @JsonIgnore
    private String fileUuid;
    // 사용여부
    @JsonIgnore
    private Integer useFlag;
    // 파일유형
    private String fileType;
    // 파일크기
    private Integer fileSize;
    // 파일명
    private String fileNm;
    // 실제 저장된 파일명
    private String savedFileNm;
    // 파일경로
    @JsonIgnore
    private String filePath;
    // 이미지 경로
    @JsonIgnore
    private String imgViewPath;

    private Resource resource;

    private String createDt;
    // 생성자
    private Integer createUserKey;


}
