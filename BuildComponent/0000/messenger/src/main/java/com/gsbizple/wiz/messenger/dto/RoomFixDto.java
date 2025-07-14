package com.gsbizple.wiz.messenger.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RoomFixDto {

    private Integer corporateId;

    private String roomId; //채팅방ID

    private Integer userKey; //사용자KEY

    private Integer fixOrder; //핀순번

    private Integer createUserKey; //생성자

    private Integer modifyUserKey; //수정자

    private String moveFlag;

    private String sign;

}
