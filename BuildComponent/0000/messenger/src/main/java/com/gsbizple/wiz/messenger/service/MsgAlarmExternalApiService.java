package com.gsbizple.wiz.messenger.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.spec.AlarmType;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.dto.AlarmTemplateDto;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringSubstitutor;
import org.apache.ibatis.session.SqlSession;
import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Slf4j
@Service
@Transactional
public class MsgAlarmExternalApiService {

    // list 나누는 기준
    public static final Integer batchSize = 200;

    private final SqlSession sqlSession;
    private final MsgRedisApiService msgRedisApiService;

    public MsgAlarmExternalApiService(SqlSession sqlSession, MsgRedisApiService msgRedisApiService) {
        this.sqlSession = sqlSession;
        this.msgRedisApiService = msgRedisApiService;
    }

    /**
     * 알림 메시지 리스트 저장
     *
     * @param alarmList List<AlarmDto>
     */
    public List<AlarmDto> saveAlarmList(List<AlarmDto> alarmList) {

        // Step 1. 템플릿 코드에 대한 확인(중복 템플릿 제거)
        List<String> templateDistList = alarmList.stream()
                .map(AlarmDto::getTemplateCode)
                .distinct()
                .toList();

        // Step 2. 템플릿 정보 조회
        List<AlarmTemplateDto> templateList = new ArrayList<>();
        for(String templateCode : templateDistList){
            AlarmTemplateDto templateDto = AlarmTemplateDto.builder()
                    .templateCode(templateCode)
                    .language(String.valueOf(Locale.KOREAN))
                    .useYn("Y")
                    .build();

            AlarmTemplateDto alarmTemplateInfo = sqlSession.selectOne("AlarmTemplateMapper.getAlarmTemplateInfo", templateDto);
            if (alarmTemplateInfo == null) {
                throw new SDKException(SDKSpec.FAIL_ALARM_TEMPLATE_EMPTY, "등록되지 않은 템플릿 코드입니다.");
            }
            templateList.add(alarmTemplateInfo);
        }

        // Step 3. 메시지 세팅
        try {
            // 알림 저장일시 일괄 처리를 위한 사전 조회
            AlarmDto createDto =  (AlarmDto) sqlSession.selectOne("AlarmMapper.getAlarmCreateDt");
            for(AlarmDto alarmDto : alarmList){

                // 알림 메시지 처리
                String roomId = (String) sqlSession.selectOne("AlarmMapper.getAlarmRoomId", alarmDto);
                alarmDto.setRoomId(roomId); // roomId
                alarmDto.setCreateUserKey(alarmDto.getReceiveUserKey());
                alarmDto.setModifyUserKey(alarmDto.getReceiveUserKey());
                alarmDto.setCreateDt(createDto.getCreateDt());

                // 데이터 처리용 값 세팅
                for(AlarmTemplateDto alarmTemplateDto : templateList ){
                    if(alarmTemplateDto.getTemplateCode().equals(alarmDto.getTemplateCode())){
                        alarmDto.setTemplateMessage(alarmTemplateDto.getTemplateMessage());
                    }
                }

                if (alarmDto.getTemplateBody() == null) {
                    alarmDto.setMessageContent(alarmDto.getTemplateMessage());
                } else {
                    // 발송요청 메시지 생성
                    makeAlarmMessage(alarmDto);
                }

                // 메시지 검색용 plain text 처리
                alarmDto.setMessageText(Jsoup.parse(alarmDto.getMessageContent()).text());

                // 내가 나한테 요청한 경우 수락/거저르이 값을 수락(Y)로 처리
                if (alarmDto.getAlarmType().equals(AlarmType.CONFIRM)) {
                    if (Objects.equals(alarmDto.getReceiveUserKey(), alarmDto.getSendUserKey())) {
                        alarmDto.setConfirmYn("Y");
                    }
                }
            }
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_ALARM_TEMPLATE_BODY_PARSING, "요청 받은 본문 내용 형식이 잘못 되었습니다.");
        }

        // Step 4. 메시지 저장
        List<List<AlarmDto>> alarmPartitionList = partitionList(alarmList, batchSize);
        for (List<AlarmDto> insertList : alarmPartitionList) {
            sqlSession.insert("AlarmMapper.insertAlarmList", insertList); // 알림 저장
        }

        return alarmList;
    }

    /**
     * 메시지 템플릿에 발송요청 내용을 적용한 최종 알림 메시지 생성
     *
     * @param alarmDto AlarmDto
     */
    @SuppressWarnings("unchecked")
    private void makeAlarmMessage(AlarmDto alarmDto) throws Exception {
        Map<String, String> templateParams = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .readValue(alarmDto.getTemplateBody(), Map.class);

        // 템플릿 발송요청 내용 문구 처리
        StringSubstitutor substitutor = new StringSubstitutor(templateParams);
        String templateMessage = substitutor.replace(alarmDto.getTemplateMessage());

        // 완성된 템플릿의 html처리(색상, 굵기 등)
        Map<String, String> replacements = Map.of(
                "#sColorBlue#", "<span style=\"color: blue;\">",
                "#sColorRed#", "<span style=\"color: red;\">",
                "#eColor#", "</span>",
                "#sStrong#", "<strong>",
                "#eStrong#", "</strong>"
        );
        String alarmMessage = replacements.entrySet()
                .stream()
                .reduce(templateMessage, (str, entry) -> str.replaceAll(entry.getKey(), entry.getValue()), (s1, s2) -> s1);

        alarmDto.setMessageContent(alarmMessage);
    }

    /**
     * 리브트 분할 처리
     *
     * @param list      List<T>
     * @param batchSize int
     * @return <T>
     */
    public static <T> List<List<T>> partitionList(List<T> list, int batchSize) {
        List<List<T>> partitions = new ArrayList<>();
        for (int i = 0; i < list.size(); i += batchSize) {
            partitions.add(list.subList(i, Math.min(i + batchSize, list.size())));
        }
        return partitions;
    }
    
    /**
     * Step 2. 메시지 Redis전송
     * @param companyCd String
     * @param sendList List<AlarmDto>
     */
    public void redisPublishAlarm(String companyCd, List<AlarmDto> sendList){
        if (!CollectionUtils.isEmpty(sendList)) {
            sendList.forEach(alarmDto -> msgRedisApiService.publishAlarmDto(alarmDto, companyCd));
        }
    }




}
