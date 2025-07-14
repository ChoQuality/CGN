package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.dto.AiRealTimeDto;
import com.gsbizple.wiz.common.spec.messenger.MessageType;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Integer corporateId; // 조회용 기업아이디
    private String roomId;
    private String company;
    private RoomType roomType;
    private String messageContent;

    private MessageType messageType;
    private String userNm;
    private String messageUuid; // redis lockKey 생성용도(밀리초 단위의 현재 시간 출력)
    private Long replyMessageId; // null 허용

    private Long messageId;
    private String emojiYn; // 감정표현여부
    private String attachmentYn; // 첨부여부
    private List<AttachmentDto> attachmentList; // 첨부파일리스트

    private String deletedYn;
    private String updateYn; // 수정여부
    private String orgNm;

    private Integer sendUserKey;
    private List<ParticipantDto> targetUserIdList;
    private UpperMessageDto upperMessageDto;

    private Integer createUserKey;
    private Integer modifyUserKey;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifyDt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt;

    //room에 대한 변경 처리를 위한 변수
    private String roomName; //채팅방명
    private String description; //채팅방설명
    private String publishType; //redis publish 구분

    private String createDtFormatted;

    private AiRealTimeDto aiRealTimeDto;
    private List<EmojiDto> emojiList;

}
