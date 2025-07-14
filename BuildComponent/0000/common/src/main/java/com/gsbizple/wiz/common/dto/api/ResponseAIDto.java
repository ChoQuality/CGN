package com.gsbizple.wiz.common.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseAIDto<D> {
    private int code;
    private String message;
    private D data;
}
