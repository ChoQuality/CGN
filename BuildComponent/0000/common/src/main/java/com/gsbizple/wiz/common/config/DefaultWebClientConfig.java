package com.gsbizple.wiz.common.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.Connection;
import reactor.netty.http.client.HttpClient;
import reactor.netty.resources.ConnectionProvider;

import java.time.Duration;

@Configuration
public class DefaultWebClientConfig {

    private static final int MAX_CONNECTIONS = 100;
    private static final Duration MAX_IDLE_TIME = Duration.ofMinutes(10);
    private static final Duration MAX_LIFE_TIME = Duration.ofHours(1);
    private static final Duration PENDING_ACQUIRE_TIMEOUT = Duration.ofSeconds(60);
    private static final Duration RESPONSE_TIMEOUT = Duration.ofHours(2);
    private static final int CONNECT_TIMEOUT_MILLIS = 30000;
    private static final int READ_WRITE_TIMEOUT_SECONDS = 7200;

    @Bean("DefaultWebClient")
    public WebClient createLongLivedDefaultWebClient() {
        ConnectionProvider connectionProvider = createConnectionProvider();
        HttpClient httpClient = createHttpClient(connectionProvider);
        return createWebClient(httpClient);
    }

    private ConnectionProvider createConnectionProvider() {
        return ConnectionProvider.builder("long-lived")
                .maxConnections(MAX_CONNECTIONS)
                .maxIdleTime(MAX_IDLE_TIME)
                .maxLifeTime(MAX_LIFE_TIME)
                .pendingAcquireTimeout(PENDING_ACQUIRE_TIMEOUT)
                .build();
    }

    private HttpClient createHttpClient(ConnectionProvider connectionProvider) {
        return HttpClient.create(connectionProvider)
                .responseTimeout(RESPONSE_TIMEOUT)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, CONNECT_TIMEOUT_MILLIS)
                .doOnConnected(this::configureTimeouts);
    }

    private void configureTimeouts(Connection connection) {
        connection.addHandlerLast(new ReadTimeoutHandler(READ_WRITE_TIMEOUT_SECONDS))
                .addHandlerLast(new WriteTimeoutHandler(READ_WRITE_TIMEOUT_SECONDS));
    }

    private WebClient createWebClient(HttpClient httpClient) {
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .defaultHeader("Connection", "keep-alive")
                .defaultHeader("Keep-Alive", "timeout=300")
                .build();
    }
}
