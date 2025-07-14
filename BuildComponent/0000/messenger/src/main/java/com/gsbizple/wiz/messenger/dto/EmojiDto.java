package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gsbizple.wiz.common.spec.messenger.MessageType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EmojiDto {
    private Integer emojiId;
    private Long messageId;
    private String emojiType;
    private Integer count;
    private Integer userKey;
    private String orgNm;
    private String userNm;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime modifyDt;
    private String deleteYn;
    private String roomId;
    private MessageType messageType;

    private List<UserDto> userList;
}
