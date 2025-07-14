package com.gsbizple.wiz.messenger.dto;

import com.gsbizple.wiz.common.spec.messenger.RoomType;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DrawUserBatchDto {

    //User
    private String userId;
    private String userName;
    private String isDraw;
    private String userStatus;

    //Room
    private String roomId;
    private String roomName;
    private RoomType roomType;
    private String isActive;

    //Participant
    private String participantId;
    private String isDelete;
    private String isPresent;

}
