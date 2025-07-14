package com.gsbizple.wiz.messenger.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class MsgRedisChannelApiService {

    private final Map<String, ChannelTopic> topics;
    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final MessageListener messageListener;


    public void addChannelTopic(String company, String channelName) {
        channelName = company + channelName;
        if (topics.get(channelName) == null) {
            ChannelTopic channelTopic = new ChannelTopic(channelName);
            topics.put(channelName, channelTopic);
            addListenerForTopic(channelTopic);
            log.info("Added topic: {}", topics);
        }
    }

    private void addListenerForTopic(ChannelTopic channelTopic) {
        redisMessageListenerContainer.addMessageListener(messageListener, channelTopic);
    }

}
