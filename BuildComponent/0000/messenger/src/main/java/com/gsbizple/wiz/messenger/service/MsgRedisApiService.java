package com.gsbizple.wiz.messenger.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.common.spec.messenger.PublishType;
import com.gsbizple.wiz.messenger.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class MsgRedisApiService implements MessageListener {

    private final RedisTemplate<String, Object> redisTemplate;

    private final MsgWebSocketApiChatHandler msgWebSocketApiChatHandler;

    private final ChannelTopic noticeTopic;

    private void convertAndSend(String channel, Object message, String company) {
        if (!StringUtils.isEmpty(company)) {
            channel = company + channel;
        }
        redisTemplate.convertAndSend(channel, message);
    }

    public void publishToNotice(MessageDto messageDto, String company) {
        convertAndSend(noticeTopic.getTopic(), new RedisMessageDto<>(PublishType.MESSAGE, messageDto.getRoomId(), company), company);
    }

    public void publishMessageDto(MessageDto messageDto, String company) {
        convertAndSend(messageDto.getRoomId(), new RedisMessageDto<>(PublishType.MESSAGE, messageDto, company), company);
    }

    public void publishRoomDto(RoomDto roomDto, String company) {
        convertAndSend(roomDto.getRoomId(), new RedisMessageDto<>(PublishType.ROOM, roomDto, company), company);
    }

    public void publishAlarmDto(AlarmDto alarmDto, String company) {
        convertAndSend(alarmDto.getRoomId(), new RedisMessageDto<>(PublishType.ALARM, alarmDto, company), company);
    }

    public void publishEmojiDto(EmojiDto emojiDto, String company) {
        convertAndSend(emojiDto.getRoomId(), new RedisMessageDto<>(PublishType.EMOJI, emojiDto, company), company);
    }

    @Override
    public void onMessage(Message message, byte[] pattern) {

        log.info("onMessage={}", new String(message.getBody()));
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        try {
            RedisMessageDto<?> redisMessageDto = objectMapper.readValue(message.getBody(), RedisMessageDto.class);

            DataSourceContextHolder.setDataSourceKey(redisMessageDto.getCompany());

            log.info("RedisMessageDto={}", redisMessageDto);
            Object data = redisMessageDto.getData();
            PublishType publishType = redisMessageDto.getPublishType();
            String company = redisMessageDto.getCompany();
            String channelName = new String(pattern);
            if (noticeTopic.getTopic().equals(channelName)) {
                msgWebSocketApiChatHandler.handleOnNotice(data.toString(), company);
                return;
            }

            if (PublishType.ROOM == publishType) {
                msgWebSocketApiChatHandler.handleOnRoom(objectMapper.convertValue(data, RoomDto.class), company);
            } else if (PublishType.MESSAGE == publishType) {
                msgWebSocketApiChatHandler.handleOnMessage(objectMapper.convertValue(data, MessageDto.class), company);
            } else if (PublishType.ALARM == publishType) {
                msgWebSocketApiChatHandler.handleOnAlarm(objectMapper.convertValue(data, AlarmDto.class), company);
            } else if (PublishType.EMOJI == publishType) {
                msgWebSocketApiChatHandler.handleOnEmoji(objectMapper.convertValue(data, EmojiDto.class), company);
            }
        } catch (IOException e) {
            throw new SDKException(SDKSpec.FAIL_READ_REDIS_MESSAGE);
        }

    }
}
