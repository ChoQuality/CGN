package com.gsbizple.wiz.messenger.controller.api;


import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.*;
import com.gsbizple.wiz.messenger.service.MsgCryptoService;
import com.gsbizple.wiz.messenger.service.MsgMessageApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import java.security.InvalidKeyException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messenger/message")
public class MsgMessageApiController {

    //todo MsgMessageApiService 는 기능 속도 테스트 후 적용 여부 확인
    private final MsgMessageApiService msgMessageApiService;
    private final MsgCryptoService msgCryptoService;

    //todo MsgMessageApiService 는 기능 속도 테스트 후 적용 여부 확인
    @PostMapping("/fetchKey")
    public ResponseEntity<String> fetchKey(@AuthenticationPrincipal AWPUser user) {
        var publicKey = msgCryptoService.fetchPublicKey(user.getLoginInfo());
        return ResponseEntity.status(HttpStatus.OK).body(publicKey);
    }

    //todo MsgMessageApiService 는 기능 속도 테스트 후 적용 여부 확인
    //todo 테스트용
    @PostMapping("/encryptMessage")
    public ResponseEntity<MessageDto> encryptMessage(@AuthenticationPrincipal AWPUser user, @RequestBody Map<String, String> requestBody) throws IllegalBlockSizeException, BadPaddingException, InvalidKeyException {

        var messageDto = MessageDto.builder()
                .messageContent(requestBody.get("content"))
                .build();
        messageDto = msgCryptoService.encryptMessage(user.getLoginInfo(), messageDto);
        return ResponseEntity.status(HttpStatus.OK).body(messageDto);
    }

    @PostMapping("/decryptMessage")
    public ResponseEntity<MessageDto> decryptMessage(@AuthenticationPrincipal AWPUser user, @RequestBody MessageDto messageDto) throws IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        messageDto = msgCryptoService.decryptMessage(user.getLoginInfo(), messageDto);
        return ResponseEntity.status(HttpStatus.OK).body(messageDto);
    }

    //todo MsgMessageApiService 는 기능 속도 테스트 후 적용 여부 확인

    /**
     * 메세지 저장
     */
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<MessageDto>> saveMessage(@AuthenticationPrincipal AWPUser user, @RequestBody MessageDto messageDto) throws IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        try {
            messageDto = msgCryptoService.decryptMessage(user.getLoginInfo(), messageDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.saveMessage(messageDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_SAVE);
        }

    }

    /**
     * 메세지 조회
     */
    @PostMapping("/list")
    public ResponseEntity<ResponseDto<List<MessageDto>>> getMessages(@RequestBody MessageDto messageDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.findByAllMessage(messageDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_FETCH);
        }
    }

    @PostMapping("/listToUpper")
    public ResponseEntity<ResponseDto<List<MessageDto>>> getMessagesToUpper(@RequestBody Map<String, Object> rParams) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.getMessagesToUpper(rParams));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_FETCH);
        }
    }

    /**
     * 안읽은 메시지 조회
     * @param roomId String
     * @param readMessageId int
     * @return List<MessageDto>
     */
    @GetMapping("/list/{roomId}/{readMessageId}")
    public ResponseEntity<ResponseDto<List<MessageDto>>> getMessagesByMessageId(@PathVariable String roomId, @PathVariable int readMessageId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.selectUnReadMessageInfo(roomId, readMessageId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_UNREAD_MESSAGE_FETCH);
        }
    }

    /**
     * 채팅방 마지막 메세지 조회
     */
    @GetMapping("/latest/{roomId}/{userKey}")
    public ResponseEntity getLatestMessage(@PathVariable String roomId, @PathVariable String userKey) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.findByLatestMessage(roomId, userKey));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_LAST_MESSAGE_FETCH);
        }
    }

    /**
     * 채팅방에서 키워드로 조회
     */
    @GetMapping("/rooms/{roomId}/{userKey}/keywords/{keyword}")
    public ResponseEntity<ResponseDto<List<MessageSearchDto>>> searchMessagesByKeyword(@PathVariable String roomId, @PathVariable String userKey, @PathVariable String keyword) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.searchMessageByKeyword(roomId, userKey, keyword));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_KEYWORD_SEARCH);
        }
    }

    /**
     * 채팅방에서 키워드로 조회한 결과 건수
     */
    @GetMapping("/rooms/{roomId}/{userKey}/keywords/{keyword}/count")
    public ResponseEntity<ResponseDto<Integer>> getMessageCountByKeyword(@PathVariable String roomId, @PathVariable String userKey, @PathVariable String keyword) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.countMessageByKeyword(roomId, userKey, keyword));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_KEYWORD_COUNT_FETCH);
        }
    }

    /**
     * 최근 메세지ID로 읽은 메세지ID 업데이트
     */
    @PostMapping("/read/update")
    public ResponseEntity<ResponseDto<Object>> updateReadMessageId(@RequestBody MessageDto messageDto) {
        try {
            msgMessageApiService.updateReadMessageId(messageDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_READ_UPDATE);
        }
    }

    /**
     * 읽은 메세지ID 삭제
     **/
    @PostMapping("/read/delete")
    public ResponseEntity<ResponseDto<ParticipantDto>> deleteReadMessageId(@RequestBody ParticipantDto participantDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.messageReadDelete(participantDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_READ_DELETE);
        }
    }

    /**
     * 읽은 메세지ID 조회
     **/
    @GetMapping("/read/{roomId}/{userKey}")
    public ResponseEntity<ResponseDto<ParticipantDto>> getReadMessages(@PathVariable String roomId, @PathVariable String userKey) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.findByMessageRead(roomId, userKey));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_READ_FETCH);
        }
    }


    /**
     * 메시지 삭제
     */
    @PostMapping("/delete/{roomId}/{messageId}")
    public ResponseEntity<ResponseDto<Object>> deleteMessage(@PathVariable String roomId, @PathVariable int messageId) {
        try {
            msgMessageApiService.modifyIsDelete(roomId, messageId);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_DELETE);
        }
    }

    /**
     * 답글 저장
     */
    @PostMapping("/save/reply")
    public ResponseEntity<ResponseDto<MessageDto>> saveReplyMessage(@RequestBody MessageDto messageDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgMessageApiService.saveReplyMessage(messageDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_MESSAGE_REPLY_SAVE);
        }
    }

    /**
     * 메시지ID로 메세지 삭제(discard)
     */
    @PostMapping("/{messageId}/discard")
    @Deprecated(since = "사용하지 않으면")
    public ResponseEntity discardMessageByMessageId(@PathVariable Long messageId) {
        MessageDto data = msgMessageApiService.discardMessageByMessageId(messageId);
        return ResponseEntity.status(HttpStatus.OK).body(data);
    }
}
