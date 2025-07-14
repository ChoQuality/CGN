package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.AlarmType;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.common.spec.messenger.MessageType;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import com.gsbizple.wiz.common.spec.messenger.SendSystem;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.dto.EmojiDto;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MsgWebSocketApiController {

    private final MsgWebSocketApiChatHandler webSocketChatHandler;
    private final MsgRedisApiService msgRedisApiService;
    private final MsgRedisChannelApiService msgRedisChannelApiService;
    private final MsgAlarmApiService msgAlarmApiService;
    private final MsgAiApiService msgAIApiService;

    @MessageMapping("/send/message")
    public ResponseEntity<ResponseDto<Object>> sendMessage(MessageDto messageDto) {
        try {
            var corpId = messageDto.getCompany();
            DataSourceContextHolder.setDataSourceKey(corpId);
            log.info("Received message from websocket: {}", messageDto);

            MessageType messageType = messageDto.getMessageType();
            boolean hasAttachments = isHasAttachments(messageDto);
            if (messageType.isJoinEnterMessage()) {
                addChannelTopic(messageDto);
            }
            if (messageType != MessageType.ENTER) {
                if (messageType.isPraiseMessage()) {
                    praiseMessageHandle(messageDto);
                } else if (messageType.isUpdateMessage()) { // 메시지 편집
                    updateMessageHandle(messageDto, hasAttachments);
                } else if (messageType == MessageType.EMOJI) {
                    log.debug("emoji message: {}", messageDto);
                    msgRedisApiService.publishEmojiDto(convertEmojiDto(messageDto), messageDto.getCompany());
                } else {
                    etcMessageHandle(messageDto, hasAttachments);
                }
            }

            if (messageDto.getRoomType() == RoomType.DOROTHY) {
                msgAIApiService.callDorothy(messageDto);
            }
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS);
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_WEBSOCKET_SEND_MESSAGE);
        }

    }

    private void etcMessageHandle(MessageDto messageDto, boolean hasAttachments) {
        webSocketChatHandler.saveMessage(messageDto);
        if (hasAttachments) {
            // 첨부파일이 존재할 때 처리할 로직
            log.debug("첨부파일 존재: {}", messageDto.getAttachmentList());
            webSocketChatHandler.updateAttachmentsMessageId(messageDto);
        }

        log.debug("save Message from websocket: {}", messageDto);
        msgRedisApiService.publishMessageDto(messageDto, messageDto.getCompany());
    }

    private void updateMessageHandle(MessageDto messageDto, boolean hasAttachments) {
        if (hasAttachments) {
            webSocketChatHandler.updateAttachmentDeletedYn(messageDto);
        }

        // 메시지의 대화내용이 없고, 파일이 전부 삭제된 경우에는 메시지를 삭제 처리 한다.
        webSocketChatHandler.updateMessage(messageDto);
        msgRedisApiService.publishMessageDto(messageDto, messageDto.getCompany());
    }

    private void praiseMessageHandle(MessageDto messageDto) {
        AlarmDto alarmDto = convertAlarmDto(messageDto);

        String receiverInfo = webSocketChatHandler.getPraiseReceiveUserInfo(messageDto.getTargetUserIdList().getFirst().getUserKey());
        messageDto.setMessageContent(String.join("\n", receiverInfo, messageDto.getMessageContent()));
        webSocketChatHandler.saveMessage(messageDto);
        msgRedisApiService.publishMessageDto(messageDto, messageDto.getCompany());

        msgAlarmApiService.saveAlarm(alarmDto);
        log.debug("savePraiseMessage from websocket: {}", messageDto);
    }

    private static boolean isHasAttachments(MessageDto messageDto) {
        boolean hasAttachments = messageDto.getAttachmentList() != null && !messageDto.getAttachmentList().isEmpty();
        messageDto.setAttachmentYn(hasAttachments ? "Y" : "N");
        return hasAttachments;
    }

    private static EmojiDto convertEmojiDto(MessageDto messageDto) {
        EmojiDto emojiDto = new EmojiDto();
        emojiDto.setMessageId(messageDto.getMessageId());
        emojiDto.setRoomId(messageDto.getRoomId());
        emojiDto.setMessageType(messageDto.getMessageType());
        return emojiDto;
    }

    private AlarmDto convertAlarmDto(MessageDto messageDto) {
        AlarmDto alarmDto = new AlarmDto();
        alarmDto.setSendUserKey(messageDto.getSendUserKey());
        alarmDto.setSendSystem(SendSystem.MESSENGER);
        alarmDto.setReceiveUserKey(messageDto.getTargetUserIdList().getFirst().getUserKey());
        alarmDto.setAlarmType(AlarmType.PRAISE);
        alarmDto.setTemplateCode(messageDto.getMessageType().getCode());
        alarmDto.setTemplateBody(getTemplateBody(messageDto.getMessageContent()));
        alarmDto.setCompany(messageDto.getCompany());
        return alarmDto;
    }

    private String getTemplateBody(String msg) {
        return String.format("{\"msg\":\"%s\"}", msg);
    }


//    private static String getSelectedDB(StompHeaderAccessor headerAccessor) {
//        // StompHeaderAccessor에서 Authentication 가져오기
//        Authentication authentication = (Authentication) headerAccessor.getUser();
//
//        if (authentication != null && authentication.isAuthenticated()) {
//            // Authentication에서 사용자 정보 가져오기
//            Object principal = authentication.getPrincipal();
//            if (principal instanceof AWPUser awpUser) {
//                log.info("현재 사용자 awpUser: {}", awpUser);
//                return awpUser.getLoginInfo().getSelectedDB();
//            }
//        }
//        throw new SDKException(SDKSpec.FAIL_WEBSOCKET_SEND_MESSAGE);
//    }

    private void addChannelTopic(MessageDto messageDto) {
        msgRedisChannelApiService.addChannelTopic(messageDto.getCompany(), messageDto.getRoomId());
    }
}