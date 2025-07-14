package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.spec.messenger.MessageType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
    private Integer messageId;
    private Integer attachmentId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt;
    private String deletedYn;
    private String messageContent;
    private MessageType messageType;
    private String roomId;
    private Integer sendUserKey;
    private Integer replyMessageId;
    private String groupName;
    private String userNm;
    private String originFileName;
    private UpperMessageDto upperMessageDto;

    private String createDtFormatted;
}
