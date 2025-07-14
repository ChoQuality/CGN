package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.service.MsgRedisChannelApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@RequestMapping("/messenger/redis/channel")
@RestController
@RequiredArgsConstructor
public class MsgRedisChannelApiController {

    private final MsgRedisChannelApiService msgRedisChannelApiService;


    /*
        JOIN, ENTER 시에 roomid로 채널추가해야함.
     */
    @PostMapping("/add/{channelName}/{company}")
    public ResponseEntity<ResponseDto<Object>> addChannel(@PathVariable String channelName, @PathVariable String company) {
        try {
            msgRedisChannelApiService.addChannelTopic(company, channelName);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_REDIS_CHANNEL_ADD);
        }
    }
}
