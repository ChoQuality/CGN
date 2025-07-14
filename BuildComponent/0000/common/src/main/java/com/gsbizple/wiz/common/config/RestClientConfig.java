package com.gsbizple.wiz.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.Map;
import java.util.function.Supplier;

@Configuration
public class RestClientConfig {

    @Value("${server.url}")
    String baseUrl;

    @Bean
    public RestClient geetRestClient() {
        return RestClient.builder()
                .requestFactory(customRequestFactory())
                //.messageConverters(converters -> converters.add(new MyCustomMessageConverter()))
                .baseUrl(baseUrl)
                .defaultUriVariables(Map.of("variable", "foo"))
                .defaultHeader("My-Header", "Foo")
                //.requestInterceptor(myCustomInterceptor)
                //.requestInitializer(myCustomInitializer)
                .build();
    }

    /**
     * ClientHttpRequestFactory를 생성
     *
     * @return ClientHttpRequestFactory
     */
    ClientHttpRequestFactory customRequestFactory() {
        ClientHttpRequestFactorySettings settings = ClientHttpRequestFactorySettings.DEFAULTS
                .withConnectTimeout(Duration.ofSeconds(5))  // 연결 타임아웃을 5초로 설정
                .withReadTimeout(Duration.ofSeconds(3600)); // 읽기 타임아웃을 5초로 설정
        return ClientHttpRequestFactories.get(settings);
    }
}