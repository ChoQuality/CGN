package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.RoomDto;
import com.gsbizple.wiz.messenger.dto.RoomListDto;
import com.gsbizple.wiz.messenger.service.MsgRoomApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/room")
public class MsgRoomApiController {

    private final MsgRoomApiService msgRoomApiService;

    /**
     * 채팅방 생성
     **/
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<RoomDto>> createRoom(@RequestBody RoomDto roomDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.createRoomByApi(roomDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_CREATE);
        }
    }

    /**
     * 채팅방 정보 조회
     **/
    @GetMapping("/{roomId}")
    public ResponseEntity<ResponseDto<RoomDto>> getRoomInfo(@PathVariable String roomId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.getRoomInfo(roomId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_FETCH);
        }
    }

    /**
     * 참여중인 채팅방 리스트 조회
     **/
    @GetMapping("/list")
    public ResponseEntity<ResponseDto<List<RoomListDto>>> getUserRooms() {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.getRoomList());
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_PARTICIPATION_FETCH);
        }
    }

    /**
     * 참여중인 채팅방 keyword 검색
     **/
    @GetMapping("/list/keyword/{keyword}")
    public ResponseEntity<ResponseDto<List<RoomListDto>>> searchRoomByKeyword(@PathVariable String keyword) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.getRoomListByKeyword(keyword));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_SEARCH);
        }
    }

    /**
     * 채팅방 정보 수정
     **/
    @PostMapping("/modifyRoom")
    public ResponseEntity<ResponseDto<RoomDto>> modifyRoom(@RequestBody RoomDto roomDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.modifyRoom(roomDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_UPDATE);
        }
    }

    /**
     * 채팅방 생성 전 참여대화방 중복체크
     */
    @PostMapping("/participating")
    public ResponseEntity<ResponseDto<List<RoomDto>>> checkRoomExists(@RequestBody RoomDto roomDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.getParticipatingRoom(roomDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_DUPLICATE_CHECK);
        }
    }

    /**
     * 썸넹리 이미지 저장
     */
    @PostMapping("/update/image")
    public ResponseEntity<ResponseDto<String>> updateRoomThumbnail() {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgRoomApiService.updateRoomImage());
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_THUMBNAIL_UPDATE);
        }
    }

    /**
     * userId로 참여 중인 채팅방 조회
     **/
    @GetMapping("/list/{userKey}")
    @Deprecated(since = "사용하지 않으면")
    public ResponseEntity<List<RoomDto>> getRoomListByUserKey(@PathVariable int userKey) {
        return ResponseEntity.status(HttpStatus.OK).body(msgRoomApiService.getRoomListByUserKey(userKey));
    }

    /**
     * 나의 기본 룸 생성
     */
    @PostMapping("/createMyDefaultRoom")
    public ResponseEntity<ResponseDto<Boolean>> createMyDefaultRoom() {
        try {
            msgRoomApiService.createMyDefaultRoom();
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, true);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_CREATE_DEFAULT);
        }
    }

    /**
     * 모든 사용자의 기본 룸 생성
     */
    @PostMapping("/createAllDefaultRoom")
    public ResponseEntity<ResponseDto<Boolean>> createAllDefaultRoom() {
        try {
            msgRoomApiService.createAllDefaultRoom();
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, true);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_CREATE_ALL_DEFAULT);
        }
    }

    /**
     * 모든 사용자의 [나와의 대화] 룸 생성
     */
    @PostMapping("/createAllSelfRoom")
    public ResponseEntity<ResponseDto<Boolean>> createAllSelfRoom() {
        try {
            msgRoomApiService.createAllSelfRoom();
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, true);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_CHATROOM_CREATE_ALL_DEFAULT);
        }
    }
}
