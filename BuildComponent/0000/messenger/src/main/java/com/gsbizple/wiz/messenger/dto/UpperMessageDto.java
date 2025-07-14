package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpperMessageDto {

    private Long messageId;
    private String roomId;
    private Integer sendUserKey;
    private String userNm;
    private String messageContent;
    private String deletedYn;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt;

    private String attachmentYn; // 첨부여부
    private List<AttachmentDto> attachmentList; // 첨부파일리스트

    private String createDtFormatted;
}
