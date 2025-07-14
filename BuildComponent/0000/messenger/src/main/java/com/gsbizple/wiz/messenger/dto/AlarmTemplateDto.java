package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlarmTemplateDto {

    private Integer templateKey; //템플릿KEY

    private String templateCode; //템플릿코드

    private String language; //템플릿언어코드

    private String templateName; //템플릿 제목

    private String templateMessage; //템플릿본문[HTML포함]

    private String defaultYn; //기본템플릿여부

    private String useYn; //사용여부

    private Integer createUserKey; //생성자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt; //생성일시

    private Integer modifyUserKey; //수정자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifyDt; //수정일시

}
