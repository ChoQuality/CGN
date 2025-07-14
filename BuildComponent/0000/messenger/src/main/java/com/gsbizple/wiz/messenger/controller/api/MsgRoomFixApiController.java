package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.RoomFixDto;
import com.gsbizple.wiz.messenger.service.MsgRoomFixApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/fix")
public class MsgRoomFixApiController {

    private final MsgRoomFixApiService msgRoomFixApiService;

    /**
     * 채팅방 핀 고정 생성
     */
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<RoomFixDto>> saveFix(@RequestBody RoomFixDto roomFixDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomFixApiService.createPin(roomFixDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_PIN_SET);
        }
    }

    /**
     * 채팅방 핀 해제
     */
    @PostMapping("/delete")
    public ResponseEntity<ResponseDto<RoomFixDto>> deleteFix(@RequestBody RoomFixDto roomFixDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomFixApiService.pinRemove(roomFixDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_PIN_UNSET);
        }
    }

    /**
     * 채팅방 핀 위치 이동
     */
    @PostMapping("/move")
    public ResponseEntity<ResponseDto<Boolean>> moveFix(@RequestBody RoomFixDto roomFixDto) {
        try {
            msgRoomFixApiService.pinModify(roomFixDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, true);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_PIN_ORDER_UPDATE);
        }
    }

}
