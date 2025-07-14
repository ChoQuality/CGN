package com.gsbizple.wiz.common.controller.api;

import com.gsbizple.wiz.common.dto.AiRealTimeDto;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.AiInterfaceService;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Controller
@RequestMapping("/api/ai")
@RestController
@RequiredArgsConstructor
public class AiInterfaceApiController {

    private static final int MAX_LENGTH = 10000;

    private final AiInterfaceService aiInterfaceService;

    /**
     * 실시간 연동
     * @param rParams Map<String, Object>
     * @return Object
     */
    @PostMapping("/realTime")
    public ResponseEntity<ResponseDto<Object>> realTime(@AuthenticationPrincipal AWPUser user, @RequestBody Map<String, Object> rParams) {
        try  {

            // 실시간 연동 이력 저장
            AiRealTimeDto aiRealTimeDto = aiInterfaceService.setStartInterfaceInfo(rParams);

            // AI연동
            Map<String, Object> resultInfo = aiInterfaceService.realTime(rParams,user);

            // 연동 결과 확인
            boolean isSuccess = Objects.equals(resultInfo.get("code").toString(), "200");

            // AI 연동 결과 업데이트
            aiRealTimeDto.setJobExecStatus(isSuccess ? "F" : "E");
            String trimmedData = resultInfo.get(isSuccess ? "data" : "message").toString().length() > MAX_LENGTH
                    ? resultInfo.get(isSuccess ? "data" : "message").toString().substring(0, MAX_LENGTH)
                    : resultInfo.get(isSuccess ? "data" : "message").toString();

            aiRealTimeDto.setAiServiceResult(trimmedData);
            int dataSize = resultInfo.toString().getBytes(StandardCharsets.UTF_8).length;
            aiRealTimeDto.setJobResult(String.format("%s, 응답 사이즈[%d]", aiRealTimeDto.getJobResult(), dataSize));
            aiInterfaceService.setUpdateInterfaceInfo(aiRealTimeDto);

            if (isSuccess)  return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, resultInfo.get("data"));
            else            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_REALTIME_API);

        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_REALTIME_API);
        }
    }



}
