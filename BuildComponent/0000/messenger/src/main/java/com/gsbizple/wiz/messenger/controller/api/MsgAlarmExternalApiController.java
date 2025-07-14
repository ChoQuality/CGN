package com.gsbizple.wiz.messenger.controller.api;


import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.service.MsgAlarmExternalApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/externalAlarm")
public class MsgAlarmExternalApiController {

    private final MsgAlarmExternalApiService msgAlarmExternalApiService;

    /**
     * 알림 메시지 멀티 저장
     *
     * @param alarmList List<AlarmDto>
     * @return Object
     */
    @PostMapping("/saveList")
    public ResponseEntity<ResponseDto<Object>> saveAlarmList(@RequestHeader("WIZ-COMPANY") String companyCd, @RequestBody List<AlarmDto> alarmList) {
        try {

            // Step 1. 메시지 저장
            msgAlarmExternalApiService.saveAlarmList(alarmList);

            // Step 2. 메시지 Redis전송
            msgAlarmExternalApiService.redisPublishAlarm(companyCd, alarmList);

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_SAVE);
        }
    }

}
