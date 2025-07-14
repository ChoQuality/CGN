package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.service.DateUtils;
import com.gsbizple.wiz.common.spec.LoginStatus;
import com.gsbizple.wiz.common.spec.messenger.MessageType;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomListDto {

    private String roomId; // 채팅방ID

    private RoomType roomType; // 채팅방타입

    private String roomName; // 채팅방명

    private String description; // 채팅방설명

    private long unreadMessageCount; // 안 읽은 메시지 수

    private MessageType messageType; // 메시지타입

    private Integer sendUserKey;
    private String lastMessageContent; // 마지막 메시티 콘텐츠

    private Long messageId;
    private Long readMessageId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime lastMessageDt; // 마지막 메시지 시간

    private Integer fixOrder; // 핀 정렬 순번

    private String lastMessageDtFormatted;

    private List<Integer> participantList;


    private String userNm;
    private LoginStatus loginStatus;
    private String thumbImgPath;

    public String getLastMessageDtFormatted() {
        if (lastMessageDtFormatted == null) {
            return null;
        }
        return DateUtils.formatDateBasedOnToday(lastMessageDtFormatted);
    }
}
