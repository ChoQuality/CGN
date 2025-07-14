package com.gsbizple.wiz.messenger.controller.api;


import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.dto.MessageSearchDto;
import com.gsbizple.wiz.messenger.dto.ParticipantDto;
import com.gsbizple.wiz.messenger.service.MsgAlarmApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/alarm")
public class MsgAlarmApiController {

    private final MsgAlarmApiService msgAlarmApiService;

    /**
     * 알림 메시지 저장
     *
     * @param alarmDto AlarmDto
     * @return AlarmDto
     */
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<AlarmDto>> saveAlarm(@RequestBody AlarmDto alarmDto) {
        try {
            var result = msgAlarmApiService.saveAlarm(alarmDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_SAVE);
        }
    }

    /**
     * 알림 메시지 멀티 저장
     *
     * @param alarmList List<AlarmDto>
     * @return Object
     */
    @PostMapping("/saveList")
    public ResponseEntity<ResponseDto<Object>> saveAlarmList(@RequestBody List<AlarmDto> alarmList) {
        try {
            msgAlarmApiService.saveAlarmList(alarmList);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_SAVE);
        }
    }

    /**
     * 알림 메시지 조회
     *
     * @param alarmDto AlarmDto
     * @return <List<AlarmDto>>
     */
    @PostMapping("/list")
    public ResponseEntity<ResponseDto<List<AlarmDto>>> getAlarmList(@RequestBody AlarmDto alarmDto) {
        try {
            var result = msgAlarmApiService.getAlarmList(alarmDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_FETCH);
        }
    }

    /**
     * 읽은 알림 메시지 조회
     *
     * @param participantDto ParticipantDto
     * @return ParticipantDto
     */
    @GetMapping("/read/{roomId}/{userKey}")
    public ResponseEntity<ResponseDto<ParticipantDto>> getReadAlarms(ParticipantDto participantDto) {
        try {
            var result = msgAlarmApiService.getAlarmReadInfo(participantDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_READ_FETCH);
        }
    }

    /**
     * 안읽은 메시지 조회
     * @param roomId String
     * @param readMessageId int
     * @return List<AlarmDto>
     */
    @GetMapping("/list/{roomId}/{readMessageId}")
    public ResponseEntity<ResponseDto<List<AlarmDto>>> getMessagesByMessageId(@PathVariable String roomId, @PathVariable int readMessageId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAlarmApiService.selectUnReadMessageInfo(roomId, readMessageId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_UNREAD_MESSAGE_FETCH);
        }
    }

    /**
     * 최근 알림 메세지ID로 읽은 메세지ID 업데이트
     */
    @PostMapping("/read/update")
    public ResponseEntity<ResponseDto<Object>> updateReadAlarmId(@RequestBody ParticipantDto participantDto) {
        try {
            msgAlarmApiService.saveAlarmReadInfo(participantDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_READ_UPDATE);
        }
    }

    /**
     * 메시지 삭제(deleteYn = 'Y')
     *
     * @param alarmDto AlarmDto
     * @return AlarmDto
     */
    @PostMapping("/{messageId}/discard")
    public ResponseEntity<ResponseDto<AlarmDto>> discardAlarm(AlarmDto alarmDto) {
        try {
            var result = msgAlarmApiService.discardMessage(alarmDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);

        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_MESSAGE_DISCARD);
        }
    }

    /**
     * 알림메시지 수락 및 거절 처리
     *
     * @param alarmDto AlarmDto
     * @return AlarmDto
     */
    @PostMapping("/confirm")
    public ResponseEntity<ResponseDto<AlarmDto>> confirmAlarm(@RequestBody AlarmDto alarmDto) {
        try {
            var result = msgAlarmApiService.alarmConfirmProc(alarmDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_CONFIRM_PROC);
        }
    }

    /**
     * TO_DO에서 수락 및 거절 동기화 처리
     * @param todoId String
     * @param userKey Integer
     * @param confirmYn String
     * @return Object
     */
    @PostMapping("/todoConfirm/{todoId}/{userKey}/{confirmYn}")
    public ResponseEntity<ResponseDto<Object>> setTodoConfirm(@PathVariable("todoId") String todoId, @PathVariable("userKey") Integer userKey, @PathVariable("confirmYn") String confirmYn){
        try{
            msgAlarmApiService.setTodoConfirm(todoId, userKey, confirmYn);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        }catch (SDKException e){
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_ALARM_CONFIRM_PROC);
        }
    }


    /**
     * 채팅방에서 키워드로 조회
     */
    @GetMapping("/rooms/{roomId}/{userKey}/keywords/{keyword}")
    public ResponseEntity<ResponseDto<List<MessageSearchDto>>> searchMessagesByKeyword(@PathVariable String roomId, @PathVariable String userKey, @PathVariable String keyword) {
        keyword = keyword + "%";
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAlarmApiService.searchMessageByKeyword(roomId, userKey, keyword));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_KEYWORD_SEARCH);
        }
    }

    /**
     * 채팅방에서 키워드로 조회한 결과 건수
     */
    @GetMapping("/rooms/{roomId}/{userKey}/keywords/{keyword}/count")
    public ResponseEntity<ResponseDto<Integer>> getMessageCountByKeyword(@PathVariable String roomId, @PathVariable String userKey, @PathVariable String keyword) {
        keyword = keyword + "%";
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAlarmApiService.countMessageByKeyword(roomId, userKey, keyword));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_KEYWORD_COUNT_FETCH);
        }
    }

    /**
     * 검색된 결과의 MessageId까지의 메시지 List를 조회
     * @param rParams Map<String, Object>
     * @return ResponseDto<List<AlarmDto>>
     */
    @PostMapping("/listToSearch")
    public ResponseEntity<ResponseDto<List<AlarmDto>>> getMessagesToUpper(@RequestBody Map<String, Object> rParams) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAlarmApiService.listToSearch(rParams));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_FETCH);
        }
    }


}
