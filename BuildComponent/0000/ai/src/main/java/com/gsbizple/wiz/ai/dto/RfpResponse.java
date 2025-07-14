package com.gsbizple.wiz.ai.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RfpResponse {
    private List<RfpSystemPromptDto> response = new ArrayList<>();
}
