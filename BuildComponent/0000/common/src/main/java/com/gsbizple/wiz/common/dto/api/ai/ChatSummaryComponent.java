package com.gsbizple.wiz.common.dto.api.ai;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ChatSummaryComponent {
    private String name;
    private String date;
    private String text;
}

