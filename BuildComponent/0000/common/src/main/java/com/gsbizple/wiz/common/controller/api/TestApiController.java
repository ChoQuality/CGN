package com.gsbizple.wiz.common.controller.api;

import com.auth0.jwt.JWT;
import com.gsbizple.wiz.common.constant.CommonConstant;
import com.gsbizple.wiz.common.dto.KeycloakInfoDto;
import com.gsbizple.wiz.common.dto.LoginInfoDto;
import com.gsbizple.wiz.common.dto.TblComUserDto;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.dto.api.ResponseKeyCloakDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.KeycloakProperties;
import com.gsbizple.wiz.common.service.KeycloakService;
import com.gsbizple.wiz.common.service.LoginService;
import com.gsbizple.wiz.common.spec.LoginStatus;
import com.gsbizple.wiz.common.spec.SDKSpec;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Map;
import java.util.function.Function;


@Slf4j
@Controller
@RequestMapping("/test")
@RestController
@RequiredArgsConstructor
public class TestApiController {
    private final LoginService loginService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<LoginInfoDto>> testPost(@RequestBody Map<String, String> requestBody) {

        String companyKey = requestBody.get("companyKey");
        String corporateId = requestBody.get("corporateId");
        String userKey = requestBody.get("userKey");

        var webClient= WebClient.builder().baseUrl("http://127.0.0.1:8080/").build();
        var testResponse = webClient.post().uri("test/test")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .headers(httpHeaders -> httpHeaders.add(CommonConstant.companyKey,companyKey))
                .body(BodyInserters.fromValue(Map.of("userKey", userKey, "corporateId", corporateId)))
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new RuntimeException("Client error occurred: ")))
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(new RuntimeException("Server error occurred: ")))
                .bodyToMono(LoginInfoDto.class)
                .block();

        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.<LoginInfoDto>builder()
                        .code(SDKSpec.SUCCESS.getCode())
                        .msg(SDKSpec.SUCCESS.getMessage())
                        .data(testResponse)
                        .build());
    }

    @PostMapping(value = "/test",produces = MediaType.APPLICATION_JSON_VALUE)
    public LoginInfoDto testTestPost(@RequestBody Map<String, String> requestBody) {
        String corporateId = requestBody.get("corporateId");
        String userKey = requestBody.get("userKey");
        return loginService.check(corporateId, userKey);
    }

}
