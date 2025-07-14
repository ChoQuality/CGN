package com.gsbizple.wiz.messenger.config.websocket;

import com.gsbizple.wiz.common.filter.SocketHandShakeInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final SocketHandShakeInterceptor socketHandShakeInterceptor;

    public WebSocketConfig(SocketHandShakeInterceptor socketHandShakeInterceptor) {
        this.socketHandShakeInterceptor = socketHandShakeInterceptor;
    }

    @Value("${websocket.endpoint}")
    private String endpoint;

    @Value("${server.url}")
    private String serverUrl;

    @Value("${websocket.destination.prefix}")
    private String destinationPrefix;

    @Value("${websocket.application.prefix}")
    private String applicationPrefix;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 웹소켓 연결을 위한 엔드포인트 설정
        registry.addEndpoint(endpoint)
                .addInterceptors(socketHandShakeInterceptor)
                .setAllowedOriginPatterns("*")
                /*.setAllowedOrigins(serverUrl) // CORS 허용*/
                .withSockJS(); // SockJS 사용
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지 브로커 설정
        registry.enableSimpleBroker(destinationPrefix); // 구독자 대상 prefix
        registry.setApplicationDestinationPrefixes(applicationPrefix); // 메시지 발행 대상 prefix
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.taskExecutor(webSocketExecutor());
    }

    @Override
    public void configureClientOutboundChannel(ChannelRegistration registration) {
        registration.taskExecutor(webSocketExecutor());
    }

    @Bean
    public ThreadPoolTaskExecutor webSocketExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(50);  // 최소 스레드 개수
        executor.setMaxPoolSize(100);   // 최대 스레드 개수
        executor.setQueueCapacity(200); // 작업 대기열 크기
        executor.setThreadNamePrefix("WebSocket-");
        executor.initialize();
        return executor;
    }

}