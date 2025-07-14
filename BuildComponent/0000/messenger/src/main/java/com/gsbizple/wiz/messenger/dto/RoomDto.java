package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RoomDto {
    private static final Set<RoomType> DEFAULT_ROOM_TYPES =
            EnumSet.of(RoomType.SELF, RoomType.DOROTHY, RoomType.ALARM);

    private String roomId;  // 채팅방ID

    private RoomType roomType; // 채팅방타입

    private String roomName; // 채팅방명

    private String description; // 채팅방설명

    private String activeYn; // 활성화여부

    private String roomThumbnail; // 채팅방이미지

    private Integer createUserKey; // 생성자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt; // 생성일시

    private Integer modifyUserKey; // 수정자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifyDt; // 수정일시

    private String createDtFormatted;
    private String modifyDtFormatted;

    /**
     * 채팅방 생성
     */
    private List<Integer> participantList; // 채팅방 참여자

    private Integer targetUserKey; // 룸변경시 websocket 발송 대상정보

    public RoomDto(RoomType roomType, int createUserKey, List<Integer> participantList) {
        this.roomType = roomType;
        this.createUserKey = createUserKey;
        this.participantList = participantList;
    }

    public boolean isDefaultRoom() {
        return DEFAULT_ROOM_TYPES.contains(this.roomType);
    }
}