package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.spec.SDKSpec;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@AllArgsConstructor
@Component
@Slf4j
public class RestClientUtil {

    private final RestClient restClient;

    /**
     * GET 요청을 보내고 응답을 객체로 반환
     *
     * @param targetUrl    요청을 보낼 URL
     * @param headers      요청 헤더 정보
     * @param responseType 응답을 매핑할 클래스 타입
     * @return 응답 객체
     */
    public <T> ResponseEntity<T> sendGet(String targetUrl, MultiValueMap<String, String> headers,
                                         Class<T> responseType) {
        return restClient.get()
                .uri(targetUrl)
                .accept(MediaType.APPLICATION_JSON)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .toEntity(responseType);
    }

    /**
     * POST 요청을 보내고 응답을 객체로 반환
     *
     * @param targetUrl    요청을 보낼 URL
     * @param headers      요청 헤더 정보
     * @param body         요청 본문 객체
     * @param responseType 응답을 매핑할 클래스 타입
     * @return 응답 객체
     */
    public <T> ResponseEntity<T> sendPost(String targetUrl, MultiValueMap<String, String> headers,
                                          Object body, Class<T> responseType) {
        try {
            return restClient.post()
                    .uri(targetUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .headers(httpHeaders -> httpHeaders.addAll(headers))
                    .body(body)
                    .retrieve()
                    .toEntity(responseType);
        } catch (Exception e) {
            log.error("RestClientUtil.sendPost error", e);
            throw new SDKException(SDKSpec.ERROR, e.getMessage());
        }
    }

    /**
     * PUT 요청을 보내고 응답을 객체로 반환
     *
     * @param targetUrl    요청을 보낼 URL
     * @param headers      요청 헤더 정보
     * @param body         요청 본문 객체
     * @param responseType 응답을 매핑할 클래스 타입
     * @return 응답 객체
     */
    public <T> ResponseEntity<T> sendPut(String targetUrl, MultiValueMap<String, String> headers,
                                         Object body, Class<T> responseType) {
        return restClient.put()
                .uri(targetUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .body(body)
                .retrieve()
                .toEntity(responseType);
    }

    /**
     * DELETE 요청을 보내고 응답을 객체로 반환
     *
     * @param targetUrl    요청을 보낼 URL
     * @param headers      요청 헤더 정보
     * @param responseType 응답을 매핑할 클래스 타입
     * @return 응답 객체
     */
    public <T> ResponseEntity<T> sendDelete(String targetUrl, MultiValueMap<String, String> headers,
                                            Class<T> responseType) {
        return restClient.delete()
                .uri(targetUrl)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .toEntity(responseType);
    }
}
