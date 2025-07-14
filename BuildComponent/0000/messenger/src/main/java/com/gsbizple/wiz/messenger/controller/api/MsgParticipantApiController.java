package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.ParticipantDto;
import com.gsbizple.wiz.messenger.dto.ParticipantListDto;
import com.gsbizple.wiz.messenger.service.MsgParticipantApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/participant")
public class MsgParticipantApiController {

    private final MsgParticipantApiService msgParticipantApiService;

    /**
     * Participant 저장
     **/
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<ParticipantDto>> saveParticipant(@RequestBody ParticipantDto participantDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgParticipantApiService.saveParticipant(participantDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_PARTICIPANT_SAVE);
        }
    }

    /**
     * Participant 리스트 저장
     **/
    @PostMapping("/list/save")
    public ResponseEntity<ResponseDto<List<ParticipantDto>>> saveParticipantList(@RequestBody List<ParticipantDto> participantList) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgParticipantApiService.saveParticipantList(participantList));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_PARTICIPANT_LIST_SAVE);
        }
    }

    /**
     * Participant 조회
     **/
    @GetMapping("/list/{roomId}")
    public ResponseEntity<ResponseDto<List<ParticipantListDto>>> getParticipantList(@PathVariable String roomId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgParticipantApiService.getRoomParticipantList(roomId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_PARTICIPANT_FETCH);
        }
    }

    /**
     * Participant 수정
     **/
    @PostMapping("/update")
    public ResponseEntity<ResponseDto<ParticipantDto>> updateParticipant(@RequestBody ParticipantDto participant) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgParticipantApiService.modifyParticipant(participant));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_PARTICIPANT_UPDATE);
        }
    }
}
