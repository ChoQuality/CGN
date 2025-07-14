package com.gsbizple.wiz.messenger.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.spec.AlarmType;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringSubstitutor;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MsgAlarmApiService {

    private final MessengerDao messengerDao;

    private final MsgAlarmTemplateApiService msgAlarmTemplateApiService;

    private final MsgRedisApiService msgRedisApiService;

    /**
     * 알림 메시지 저장
     *
     * @param alarmDto AlarmDto
     * @return AlarmDto
     */
    @SuppressWarnings("unchecked")
    public AlarmDto saveAlarm(AlarmDto alarmDto) {

        // 템플릿 정보 조회
        AlarmTemplateDto templateDto = AlarmTemplateDto.builder()
                .templateCode(alarmDto.getTemplateCode())
                .language(String.valueOf(Locale.KOREAN))
                .useYn("Y")
                .build();
        AlarmTemplateDto alarmTemplateInfo = msgAlarmTemplateApiService.getAlarmTemplateInfo(templateDto);

        if (alarmTemplateInfo == null) {
            throw new SDKException(SDKSpec.FAIL_ALARM_TEMPLATE_EMPTY, "등록되지 않은 템플릿 코드입니다.");
        }

        // 받는사용자KEY로 roomId찾기
        String roomId = (String) messengerDao.selectOne("AlarmMapper.getAlarmRoomId", alarmDto);

        // 데이터 처리용 값 세팅
        alarmDto.setRoomId(roomId);
        alarmDto.setTemplateMessage(alarmTemplateInfo.getTemplateMessage());
        alarmDto.setCreateUserKey(alarmDto.getReceiveUserKey());
        alarmDto.setModifyUserKey(alarmDto.getReceiveUserKey());

        // 알림 메시지 처리
        try {
            if (alarmDto.getTemplateBody() == null) {
                alarmDto.setMessageContent(alarmTemplateInfo.getTemplateMessage());
            } else {
                // 발송요청 메시지 생성
                makeAlarmMessage(alarmDto);
            }

            // 메시지 검색용 plain text 처리
            alarmDto.setMessageText(Jsoup.parse(alarmDto.getMessageContent()).text());
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_ALARM_TEMPLATE_BODY_PARSING, "요청 받은 본문 내용 형식이 잘못 되었습니다.");
        }

        // 칭찬하기의 경우 칭찬하기 메시지 저장처리
        if (alarmDto.getAlarmType() == AlarmType.PRAISE) {
            JSONObject praiseInfo = new JSONObject(alarmDto.getTemplateBody());
            alarmDto.setPraiseMsg(praiseInfo.getString("msg"));

            messengerDao.insert("AlarmMapper.savePraise", alarmDto);
        }

        // 알림메시지 저장 처리
        if(alarmDto.getAlarmType().equals(AlarmType.CONFIRM)){
            if(Objects.equals(alarmDto.getReceiveUserKey(), alarmDto.getSendUserKey())){
                alarmDto.setConfirmYn("Y");
            }
        }
        messengerDao.insert("AlarmMapper.saveAlarm", alarmDto);

        AlarmDto newAlarmDto = (AlarmDto) messengerDao.selectOne("AlarmMapper.getAlarmMessageInfo", alarmDto);
        alarmDto.setCreateDt(newAlarmDto.getCreateDt()); // 메시지 발송 시간 추가


        if (SecurityUtils.getUserAttribute() == null) {
            msgRedisApiService.publishAlarmDto(alarmDto, alarmDto.getCompany());
        } else {
            msgRedisApiService.publishAlarmDto(alarmDto, SecurityUtils.getUserAttribute().getSelectedDB());
        }

        return alarmDto;
    }

    /**
     * 알림 메시지 리스트 저장
     *
     * @param alarmList List<AlarmDto>
     */
    public void saveAlarmList(List<AlarmDto> alarmList) {
        alarmList.forEach(this::saveAlarm);
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
     * 알림메시지 조회
     *
     * @param alarmDto AlarmDto
     * @return List<AlarmDto>
     */
    @SuppressWarnings("unchecked")
    public List<AlarmDto> getAlarmList(AlarmDto alarmDto) {
        alarmDto.setLanguage(String.valueOf(Locale.KOREAN));

        List<AlarmDto> alarmList = messengerDao.selectList("AlarmMapper.getAlarmList", alarmDto);
        try {
            for (AlarmDto alarm : alarmList) {
                makeAlarmMessage(alarm);
            }
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_ALARM_MESSAGE_SEARCH, "알림메시지 조회에 실패하였습니다.");
        }

        return alarmList;
    }

    /**
     * 읽은 메시지 정보 조회
     *
     * @param participantDto ParticipantDto
     * @return ParticipantDto
     */
    @SuppressWarnings("unchecked")
    public ParticipantDto getAlarmReadInfo(ParticipantDto participantDto) {
        return (ParticipantDto) messengerDao.selectOne("AlarmMapper.getAlarmReadInfo", participantDto);
    }

    /**
     * 안읽은 메시지 조회
     *
     * @param roomId        String
     * @param readMessageId int
     * @return List<MessageDto>
     */
    @SuppressWarnings("unchecked")
    public List<AlarmDto> selectUnReadMessageInfo(String roomId, int readMessageId) {
        Map<String, Object> rParams = new HashMap<>();
        rParams.put("language", String.valueOf(Locale.KOREAN));
        rParams.put("roomId", roomId);
        rParams.put("readMessageId", readMessageId);

        List<AlarmDto> alarmList = messengerDao.selectList("AlarmMapper.getAlarmUnReadList", rParams);
        try {
            for (AlarmDto alarm : alarmList) {
                makeAlarmMessage(alarm);
            }
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_ALARM_MESSAGE_SEARCH, "알림메시지 조회에 실패하였습니다.");
        }

        return alarmList;
    }

    /**
     * 최근 알림 메세지ID로 읽은 메세지ID 업데이트
     *
     * @param participantDto ParticipantDto
     */
    @SuppressWarnings("unchecked")
    public void saveAlarmReadInfo(ParticipantDto participantDto) {
        participantDto.setReadMessageId((long) messengerDao.selectOne("AlarmMapper.getLastMessageId", participantDto));
        participantDto.setModifyUserKey(participantDto.getUserKey());
        messengerDao.update("AlarmMapper.updateAlarmReadInfo", participantDto);
    }

    /**
     * 메시지 삭제(deleteYn = 'Y')
     *
     * @param alarmDto AlarmDto
     * @return AlarmDto
     */
    @SuppressWarnings("unchecked")
    public AlarmDto discardMessage(AlarmDto alarmDto) {
        alarmDto.setModifyUserKey(SecurityUtils.getUserKey());
        messengerDao.update("AlarmMapper.updateDiscardMessage", alarmDto);
        return alarmDto;
    }

    /**
     * 알림메시지 수락 및 거절 처리
     *
     * @param alarmDto AlarmDto
     * @return AlarmDto
     */
    @SuppressWarnings("unchecked")
    public AlarmDto alarmConfirmProc(AlarmDto alarmDto) {
        try {
            messengerDao.update("AlarmMapper.updateConfirmInfo", alarmDto);
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_MESSAGE_CONFIRM, "메시지 수락/거절 처리에 실패하였습니다.");
        }
        return alarmDto;
    }

    /**
     * TO_DO에서 수락 및 거절 동기화 처리
     * @param todoId String
     * @param userKey Integer
     * @param confirmYn String
     */
    @SuppressWarnings("unchecked")
    public void setTodoConfirm(String todoId, Integer userKey, String confirmYn){
        Map<String, Object> rParams = Map.of(
                "todoId", todoId,
                "userKey", userKey,
                "confirmYn", confirmYn
        );
        List<AlarmDto> alarmDtoList =  messengerDao.selectList("AlarmMapper.getTodoConfirmInfo", rParams);
        if (alarmDtoList == null || alarmDtoList.isEmpty()) {
            return;
        }

        alarmDtoList.forEach(alarmDto -> messengerDao.update("AlarmMapper.updateConfirmInfo", alarmDto));
    }


    public List<MessageSearchDto> searchMessageByKeyword(String roomId, String userKey, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        params.put("keyword", keyword);
        return messengerDao.selectList("AlarmMapper.searchMessageByKeyword", params);
    }

    public Integer countMessageByKeyword(String roomId, String userKey, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        params.put("keyword", keyword);
        return messengerDao.total("AlarmMapper.countMessageByKeyword", params);
    }

    /**
     * 검색된 결과의 MessageId까지의 메시지 List를 조회
     * @param rParams Map<String, Object>
     * @return List<AlarmDto>
     */
    @SuppressWarnings("unchecked")
    public List<AlarmDto> listToSearch(Map<String, Object> rParams) {
        rParams.put("language", (String.valueOf(Locale.KOREAN)));

        List<AlarmDto> alarmList = messengerDao.selectList("AlarmMapper.alarmListToSearch", rParams);
        try {
            for (AlarmDto alarm : alarmList) {
                makeAlarmMessage(alarm);
            }
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_ALARM_MESSAGE_SEARCH, "알림메시지 조회에 실패하였습니다.");
        }

        return alarmList;
    }


}
