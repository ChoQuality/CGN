package com.gsbizple.wiz.common.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDto<D> {
    private int code;
    private String msg;
    private D data;
}
