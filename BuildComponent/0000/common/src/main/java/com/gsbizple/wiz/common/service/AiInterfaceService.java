package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.dao.CommonDao;
import com.gsbizple.wiz.common.dto.AiRealTimeDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.spec.AiServiceCd;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class AiInterfaceService {

    private static final int MAX_LENGTH = 10000;
    private static final String OPEN_AI_KEY = "x-api-key";

    private final CommonDao commonDao;

    private final RestClientUtil restClientUtil;

    public AiInterfaceService(CommonDao commonDao, RestClientUtil restClientUtil) {
        this.commonDao = commonDao;
        this.restClientUtil = restClientUtil;
    }

    /**
     * AI연동 이력 저장[시작]
     *
     * @param rParams Map<String, Object>
     * @return AiRealTimeDto
     */
    @SuppressWarnings("unchecked")
    public AiRealTimeDto setStartInterfaceInfo(Map<String, Object> rParams) {
        String data = getData(rParams).toString();
        String jobResult = getJobResult(rParams);
        int dataSize = data.getBytes(StandardCharsets.UTF_8).length;
        Integer userKey = getUserKey(rParams);

        String trimmedData = data.length() > MAX_LENGTH ? data.substring(0, MAX_LENGTH) : data;

        AiRealTimeDto insertData = AiRealTimeDto.builder()
                //.aiServiceId(Integer.parseInt(Objects.toString(getServiceId(rParams), "0")))
                .aiServiceCd(rParams.get("serviceCd").toString())
                .jobExecUserKey(userKey)
                .jobExecStatus("S")
                .jobResult(String.format("%s, 요청 사이즈[%d]", jobResult, dataSize))
                .aiServiceParam(trimmedData)
                .createUserKey(userKey)
                .build();

        commonDao.insert("CommonAiMapper.setStartInterfaceInfo", insertData);

        return insertData;
    }

    private static Object getServiceId(Map<String, Object> rParams) {
        return rParams.get("serviceId");
    }

    private static Integer getUserKey(Map<String, Object> rParams) {
        if (SecurityUtils.getUserKey() != null) {
            return SecurityUtils.getUserKey();
        }

        Object userKeyObj = rParams.get("userKey");

        if (userKeyObj instanceof Integer userKey) {
            return userKey;
        } else if (userKeyObj instanceof String userKey) {
            return Integer.parseInt(userKey);
        }

        return null;
    }

    private static String getJobResult(Map<String, Object> rParams) {
        return rParams.get("jobResult").toString();
    }

    private static Map<String, Object> getData(Map<String, Object> rParams) {
        return (Map<String, Object>) rParams.get("data");
    }

    /**
     * AI연동
     *
     * @param rParams Map<String, Object>
     * @return Map<String, Object>
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> realTime(Map<String, Object> rParams, AWPUser user) {
        try{
            // AI연동 URL조회
            rParams.put("userKey", SecurityUtils.getUserKey());
            Map<String, Object> apiInfo = getAiInterfaceInfo(rParams);

            // Header 설정
            MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
            headers.add(OPEN_AI_KEY, apiInfo.get("aiServiceKey").toString()); // apiKey 추가

            // Data 설정 및 연동
            Map<String, Object> requestData = getData(rParams);
            requestData.put("service_id", user.getLoginInfo().getCorpId().toString());
            requestData.put("emp_no", apiInfo.get("empNo").toString());

            ResponseEntity<Map> response = restClientUtil.sendPost(apiInfo.get("aiServiceUrl").toString(), headers, requestData, Map.class);
            return (Map<String, Object>) response.getBody();
        }catch(Exception e){
            Map<String, Object> returnMap = new HashMap<>();
            returnMap.put("code", "9999");
            returnMap.put("message", getStackTraceAsString(e));
            return returnMap;
        }
    }

    /**
     * 에러로그 to String 변환
     * @param e Exception
     * @return String
     */
    public String getStackTraceAsString(Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        return sw.toString();
    }
    
    @SuppressWarnings("unchecked")
    public Map<String, Object> getAiInterfaceInfo(Map<String, Object> rParams) {
        return (Map<String, Object>) commonDao.selectOne("CommonAiMapper.getAiInterfaceInfo", rParams);
    }

    /**
     * AI연동 이력 수정[종료]
     *
     * @param aiRealTimeDto AiRealTimeDto
     */
    @SuppressWarnings("unchecked")
    public void setUpdateInterfaceInfo(AiRealTimeDto aiRealTimeDto) {
        commonDao.update("CommonAiMapper.setUpdateInterfaceInfo", aiRealTimeDto);
    }

    //Finish 상태로 업데이트
    public void updateFinishStatus(AiRealTimeDto aiRealTimeDto) {
        aiRealTimeDto.setJobExecStatus("F");
        setUpdateInterfaceInfo(aiRealTimeDto);
    }

    public void updateErrorStatus(AiRealTimeDto aiRealTimeDto, String errorMsg) {
        aiRealTimeDto.setJobExecStatus("E");
        aiRealTimeDto.setJobResult(errorMsg);
        setUpdateInterfaceInfo(aiRealTimeDto);
    }

    public Map<String, Object> createInterfaceInfoParams(String data, Integer userKey) {
        Map<String, Object> rParams = new HashMap<>();
        Map<String, Object> chat = new HashMap<>();
        chat.put("chat", data);
        rParams.put("jobResult", data);
        rParams.put("serviceCd", AiServiceCd.MSG_DOROTHY.getCode());
        rParams.put("data", chat);
        rParams.put("userKey", userKey);

        return rParams;
    }
}