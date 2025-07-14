package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.service.MsgRedisApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@RequestMapping("/messenger/redis")
@RestController
@RequiredArgsConstructor
public class MsgRedisApiController {

    private final MsgRedisApiService msgRedisApiService;

    @PostMapping("/publish/message")
    public ResponseEntity<ResponseDto<Object>> publishMessage(@RequestBody MessageDto messageDto) {
        try {
            msgRedisApiService.publishMessageDto(messageDto, messageDto.getCompany());
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_REDIS_PUBLISH);
        }
    }

    @PostMapping("/publish/notice")
    public ResponseEntity<ResponseDto<Object>> publishNotice(@RequestBody MessageDto messageDto) {
        try {
            msgRedisApiService.publishToNotice(messageDto, "");
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_REDIS_NOTICE_PUBLISH);
        }
    }
}
