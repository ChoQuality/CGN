package com.gsbizple.wiz.ai.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseWrapper {
    private Integer userId;
    private String fileName;
    private String sysPrompt;
    private String userPrompt;
    private String result;
}
