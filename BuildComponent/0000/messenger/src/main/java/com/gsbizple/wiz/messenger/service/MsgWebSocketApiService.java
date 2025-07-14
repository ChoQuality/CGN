package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.DateUtils;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.dto.EmojiDto;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.dto.RoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MsgWebSocketApiService {
    private static final String MESSAGE_TOPIC = "/topic/message/";
    private static final String LIST_TOPIC = "/topic/list/";
    private static final String ROOM_TOPIC = "/topic/room/";
    private static final String NOTICE_TOPIC = "/topic/notice/";

    private final SimpMessagingTemplate messagingTemplate;

    public <T> void sendToWeb(String topic, Object target, T payload, String company) {
        String destination = topic + company + target;
        log.info("sendToWeb destination={} payload={}", destination, payload);
        messagingTemplate.convertAndSend(destination, payload);
    }

    public void sendToWebNoticeMessage(Object payload, String company) {
        validatePayload(payload);
        sendToWeb(NOTICE_TOPIC, "", payload, company);
    }

    public void sendToWebMessage(Object target, Object payload, String company) {
        validatePayload(payload);
        sendToWeb(MESSAGE_TOPIC, target, payload, company);
    }

    public void sendToWebList(Object target, Object payload, String company) {
        validatePayload(payload);
        convertDateFormat(payload);
        sendToWeb(LIST_TOPIC, target, payload, company);
    }

    public void sendToWebRoom(Object target, Object payload, String company) {
        validatePayload(payload);
        sendToWeb(ROOM_TOPIC, target, payload, company);
    }

    private void validatePayload(Object payload) {
        if (!(payload instanceof MessageDto || payload instanceof AlarmDto ||
                payload instanceof RoomDto || payload instanceof String || payload instanceof EmojiDto)
        ) {
            throw new SDKException(SDKSpec.FAIL_WEBSOCKET_INVALID_DTO);
        }
    }

    private void convertDateFormat(Object payload) {
        if (payload instanceof MessageDto messageDto) {
            messageDto.setCreateDtFormatted(DateUtils.formatDateBasedOnToday(messageDto.getCreateDtFormatted()));
        } else if (payload instanceof AlarmDto alarmDto) {
            alarmDto.setCreateDtFormatted(DateUtils.formatDateBasedOnToday(alarmDto.getCreateDtFormatted()));
        }

    }
}
