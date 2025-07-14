package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MessageSearchDto {

    /**
     * message
     */
    private Integer messageId;
    private String messageContent;
    private String userNm;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt;

    /**
     * attachment
     */
    private Integer attachmentId;
    private String originFileName;

    private String thumbImgPath;
    private String loginStatus;
}
