package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import com.gsbizple.wiz.common.dto.AiRealTimeDto;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.AiInterfaceService;
import com.gsbizple.wiz.common.spec.AiServiceCd;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.dto.UpperMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class MsgAiApiService {

    private static final String X_API_KEY = "x-api-key";
    private final MsgMessageApiService msgMessageApiService;
    private final AiInterfaceService aiInterfaceService;
    private final MsgRedisApiService msgRedisApiService;
    private final Map<String, Integer> corporateId;

    public void callDorothy(MessageDto messageDto) {
        CompletableFuture.supplyAsync(() -> {
            try {
                var compId = messageDto.getCompany();
                DataSourceContextHolder.setDataSourceKey(compId);
                Map<String, Object> aiInfo = getAiInterfaceInfo(messageDto.getSendUserKey());

                MultiValueMap<String, Object> requestBody = getRequestBody(messageDto, aiInfo,corporateId.get(compId));
                HttpHeaders headers = getHeaders(aiInfo);

                HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

                AiRealTimeDto aiRealTimeDto = aiInterfaceService.setStartInterfaceInfo(
                        aiInterfaceService.createInterfaceInfoParams(messageDto.getMessageContent(), messageDto.getSendUserKey()));
                messageDto.setAiRealTimeDto(aiRealTimeDto);

                ResponseEntity<ResponseDto> response = getRestTemplate().exchange(
                        getAiServiceUrl(aiInfo), HttpMethod.POST, requestEntity, ResponseDto.class);

                String responseData = Objects.requireNonNull(response.getBody()).getData().toString();
                aiRealTimeDto.setAiServiceResult(responseData);

                aiInterfaceService.updateFinishStatus(aiRealTimeDto);
                messageDto.setMessageContent(responseData);
                messageDto.setReplyMessageId(messageDto.getMessageId());

                return msgMessageApiService.saveMessage(messageDto);

            } catch (Exception e) {
                throw new SDKException(SDKSpec.FAIL_DOROTHY_RESPONSE, e.getMessage());
            }
        }).handle((responseMessageDto, ex) -> {
            String company = messageDto.getCompany();
            if (ex != null) {
                log.error("Dorothy API 호출 실패", ex);
                aiInterfaceService.updateErrorStatus(messageDto.getAiRealTimeDto(),ex.getMessage());
                MessageDto replyMessageDto = getReplyMessageDto(messageDto);
                publishMessageDto(replyMessageDto, company);
            } else {
                publishMessageDto(responseMessageDto, company);
            }
            return null;
        });
    }

    private static RestTemplate getRestTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(100));
        factory.setReadTimeout(Duration.ofSeconds(100));
        return new RestTemplate(factory);
    }

    private static HttpHeaders getHeaders(Map<String, Object> aiInfo) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set(X_API_KEY, getAiServiceKey(aiInfo));
        return headers;
    }

    private void publishMessageDto(MessageDto messageDto, String company) {
        attachUpperMessage(messageDto);
        messageDto.setMessageContent(StringEscapeUtils.unescapeHtml4(messageDto.getMessageContent()));
        msgRedisApiService.publishMessageDto(messageDto, company);
    }


    private static MultiValueMap<String, Object> getRequestBody(MessageDto messageDto, Map<String, Object> aiInfo,Integer compId) {
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("question", messageDto.getMessageContent());
        requestBody.add("service_id", compId); //ai연동 파라미터..
        requestBody.add("emp_no", aiInfo.get("empNo"));
        requestBody.add("email", aiInfo.get("email"));
        return requestBody;
    }


    private static String getAiServiceKey(Map<String, Object> aiInfo) {
        return (String) aiInfo.get("aiServiceKey");
    }

    private static String getAiServiceUrl(Map<String, Object> aiInfo) {
        return (String) aiInfo.get("aiServiceUrl");
    }

    private void attachUpperMessage(MessageDto messageDto) {
        //답글인 경우, 원본메시지 함께
        if (messageDto.getReplyMessageId() != null) {
            UpperMessageDto upperMessageDto = msgMessageApiService.findUpperMessageByMessageId(messageDto.getReplyMessageId());
            messageDto.setUpperMessageDto(upperMessageDto);
        }
    }

    private MessageDto getReplyMessageDto(MessageDto messageDto) {
        messageDto.setMessageContent("질문에 대한 응답을 받지 못했습니다.");
        messageDto.setReplyMessageId(messageDto.getMessageId());
        return msgMessageApiService.saveMessage(messageDto);
    }

    private Map<String, Object> getAiInterfaceInfo(Integer sendUserKey) {
        Map<String, Object> rParams = new HashMap<>();
        rParams.put("serviceCd", AiServiceCd.MSG_DOROTHY.getCode());
        rParams.put("userKey", sendUserKey);
        return aiInterfaceService.getAiInterfaceInfo(rParams);
    }
}