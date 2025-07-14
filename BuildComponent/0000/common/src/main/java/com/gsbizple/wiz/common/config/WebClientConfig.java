package com.gsbizple.wiz.common.config;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.WebClientService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.function.Supplier;

import static com.gsbizple.wiz.common.spec.SDKSpec.FAIL_WEBCLIENT_GET;
import static com.gsbizple.wiz.common.spec.SDKSpec.FAIL_WEBCLIENT_POST;

@Configuration
public class WebClientConfig {

    private final Supplier<String> serverUrl;
    public WebClientConfig(Environment env) {
        this.serverUrl = () -> env.getProperty("server.url");
    }
    
    @Bean
    public Supplier<String> serverUrl(){
        return serverUrl;
    }

    @Bean
    public WebClient webClient() {
        return WebClient.builder().baseUrl(serverUrl.get()).build();
    }

    @Bean
    public WebClientService webClientService(WebClient webClient) {
        return new WebClientService() {
            @Override
            public <Response> Response get(String endPoint, Class<Response> responseType, String token) {
                return webClient.get()
                        .uri(endPoint)
                        .headers(httpHeaders -> {
                                    if (StringUtils.isNotEmpty(token)) {
                                        httpHeaders.setBearerAuth(token);
                                    }
                                }
                        ) // ✅ Bearer 토큰 설정
                        .exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(responseType); // 본문 처리
                            } else {
                                throw new SDKException(FAIL_WEBCLIENT_GET);
                            }
                        })
                        .block();
            }

            @Override
            public <Request, Response> Response post(String endPoint, Request request, Class<Response> responseType, String token) {
                return webClient.post()
                        .uri(endPoint)
                        .headers(httpHeaders -> {
                                    if (StringUtils.isNotEmpty(token)) {
                                        httpHeaders.setBearerAuth(token);
                                    }
                                }
                        ) // ✅ Bearer 토큰 설정
                        .bodyValue(request)
                        .exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(responseType);
                            } else {
                                throw new SDKException(FAIL_WEBCLIENT_POST);
                            }
                        })
                        .block();
            }

            @Override
            public <Request, Response> Response put(String endPoint, Request request, Class<Response> responseType, String token) {
                return webClient.put()
                        .uri(endPoint)
                        .headers(httpHeaders -> {
                                    if (StringUtils.isNotEmpty(token)) {
                                        httpHeaders.setBearerAuth(token);
                                    }
                                }
                        ) // ✅ Bearer 토큰 설정
                        .bodyValue(request)
                        .exchangeToMono(response -> {
                            if (response.statusCode().is2xxSuccessful()) {
                                return response.bodyToMono(responseType);
                            } else {
                                throw new SDKException(FAIL_WEBCLIENT_POST);
                            }
                        })
                        .block();
            }
        };
    }
}
