package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ParticipantDto {

    private Integer corporateId;

    private String roomId; //채팅방ID

    private Integer userKey; //사용자KEY

    private String userNm;//사용자이름

    private String presentYn; //참여여부

    private String deletedYn; //삭제여부(1:1대화참여여부)

    private String publicYn; //이전대화공개여부

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime enterDt; //참여일시

    private long readMessageId; //읽은 메시지ID

    private Integer createUserKey; //생성자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt; //생성일시

    private Integer modifyUserKey; //수정자

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifyDt; //수정일시

}
