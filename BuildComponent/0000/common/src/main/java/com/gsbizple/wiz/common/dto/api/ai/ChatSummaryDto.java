package com.gsbizple.wiz.common.dto.api.ai;

import lombok.Data;

import java.util.List;

@Data
public class ChatSummaryDto {
    private List<ChatSummaryComponent> chat;
}