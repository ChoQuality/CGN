package com.gsbizple.wiz.messenger.controller.api;


import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.service.MsgAiApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/ai")
public class MsgAiApiController {

    private final MsgAiApiService msgAiApiService;


    @PostMapping("/dorothy")
    public ResponseEntity<ResponseDto<AlarmDto>> callDorothy(@RequestBody MessageDto messageDto) {
        try {
            msgAiApiService.callDorothy(messageDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_DOROTHY_RESPONSE);
        }
    }


}
