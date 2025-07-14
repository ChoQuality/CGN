package com.gsbizple.wiz.messenger.dto;

import com.gsbizple.wiz.common.spec.messenger.PublishType;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RedisMessageDto<T> {
    private PublishType publishType;
    private T data;
    private String company;
}
