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
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.Date;
import java.util.Map;
import java.util.function.Function;


@Slf4j
@Controller
@RequestMapping("/login")
@RestController
@RequiredArgsConstructor
public class LoginApiController {

    private final LoginService loginService;
    private final JWTComponent jwtComponent;
    private final KeycloakProperties keycloakProperties;
    private final KeycloakService keycloakService;
    private final Function<KeycloakInfoDto,String> funcGetKeyCloakUrl = keycloakInfo -> keycloakInfo.getKeycloakUrl().concat("/realms/").concat(keycloakInfo.getRealms()).concat("/protocol/openid-connect/token");

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<String>> login(
            HttpServletResponse response
            , @RequestHeader(CommonConstant.companyKey) String companyKey
            , @RequestBody Map<String, String> requestBody) {

        String username = requestBody.get("username");
        String password = requestBody.get("password");
        var loginInfoDto = loginService.checkUser(companyKey, username);
        var mainUrl = loginService.getMainUrl(loginInfoDto.getMenuInfo());
        var cookie = loginService.attemptLogin(loginInfoDto, password);
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.<String>builder()
                        .code(SDKSpec.SUCCESS.getCode())
                        .msg(SDKSpec.SUCCESS.getMessage())
                        .data(mainUrl)
                        .build());
    }

    @GetMapping(value = "/keycloakInfo")
    public ResponseEntity<ResponseDto<KeycloakInfoDto>> standaloneLogin(
            HttpServletResponse response) {
        var cookie = loginService.createDefaultCookie();
        var url = funcGetKeyCloakUrl.apply(keycloakProperties.getKeycloakInfo());

        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.<KeycloakInfoDto>builder()
                        .code(SDKSpec.SUCCESS.getCode())
                        .msg(SDKSpec.SUCCESS.getMessage())
                        .data(KeycloakInfoDto.builder()
                                .keycloakUrl(url)
                                .clientId(keycloakProperties.getKeycloakInfo().getClientId())
                                .clientSecret(keycloakProperties.getKeycloakInfo().getClientSecret())
                                .grantType(keycloakProperties.getKeycloakInfo().getGrantType())
                                .scope(keycloakProperties.getKeycloakInfo().getScope())
                                .build())
                        .build());
    }


    @PostMapping(value = "/decode",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<String>> decodeLogin(
            HttpServletResponse response
            , @RequestBody Map<String, String> requestBody) {
        var cookie = loginService.createDefaultCookie();
        String accessToken = requestBody.get("access_token");
        try{
            var decodedJWT = JWT.decode(accessToken);
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(decodedJWT.getClaim(CommonConstant.companyKey).asString())
                            .build());
        }  catch (Exception e) {
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_LOGIN.getCode())
                            .msg(SDKSpec.FAIL_LOGIN.getMessage())
                            .data("/?status=loginFail")
                            .build());
        }
    }


    @PostMapping(value = "/valid",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<String>> validLogin(
            HttpServletResponse response
            , @RequestBody Map<String, String> requestBody) {
        var cookie = loginService.createDefaultCookie();
        String accessToken = requestBody.get("access_token");
        var jwtVerifier = keycloakProperties.getJWTVerifier();
        try{
            var decodedJWT = JWT.decode(accessToken);
            var loginInfoDto = loginService.checkUser(decodedJWT.getClaim(CommonConstant.companyKey).asString(), decodedJWT.getClaim(CommonConstant.email).asString());
            var mainUrl = loginService.getMainUrl(loginInfoDto.getMenuInfo());
            var token = jwtComponent.createToken(loginInfoDto);
            cookie.setValue(token);
            response.addCookie(cookie);

            TblComUserDto userDto = new TblComUserDto();
            userDto.setUserKey(loginInfoDto.getUserKey());
            userDto.setLoginStatus(LoginStatus.LOGIN.getCode());
            loginService.setLoginStatus(userDto);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(mainUrl)
                            .build());
        }  catch (Exception e) {
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_LOGIN.getCode())
                            .msg(SDKSpec.FAIL_LOGIN.getMessage())
                            .data("/?status=loginFail")
                            .build());
        }
    }


    @PostMapping(value = "/total",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<String>> totalLogin(
            HttpServletResponse response
            , @RequestBody Map<String, String> requestBody) {
        var keyCloakUrl = funcGetKeyCloakUrl.apply(keycloakProperties.getKeycloakInfo());
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        var webClient= WebClient.builder().baseUrl(keyCloakUrl).build();
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", keycloakProperties.getKeycloakInfo().getClientId());
        formData.add("client_secret", keycloakProperties.getKeycloakInfo().getClientSecret());
        formData.add("username", username);
        formData.add("password", password);
        formData.add("grant_type", "password");

        var responseKeyCloakDto = webClient.post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromFormData(formData)) // bodyValue → BodyInserters 사용
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new RuntimeException("Client error occurred: ")))
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(new RuntimeException("Server error occurred: ")))
                .bodyToMono(ResponseKeyCloakDto.class)
                .block();

        var jwtVerifier = keycloakProperties.getJWTVerifier();
        if(responseKeyCloakDto != null){
            try{
                var decodedJWT = JWT.decode(responseKeyCloakDto.getAccessToken());
                var loginInfoDto = loginService.checkUser(decodedJWT.getClaim(CommonConstant.companyKey).asString(), username);
                var mainUrl = loginService.getMainUrl(loginInfoDto.getMenuInfo());
                var token = jwtComponent.createToken(loginInfoDto);
                var cookie = loginService.createDefaultCookie();
                cookie.setValue(token);
                response.addCookie(cookie);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseDto.<String>builder()
                                .code(SDKSpec.SUCCESS.getCode())
                                .msg(SDKSpec.SUCCESS.getMessage())
                                .data(mainUrl)
                                .build());
            }  catch (Exception e) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(ResponseDto.<String>builder()
                                .code(SDKSpec.FAIL_LOGIN.getCode())
                                .msg(SDKSpec.FAIL_LOGIN.getMessage())
                                .build());
            }
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_LOGIN.getCode())
                            .msg(SDKSpec.FAIL_LOGIN.getMessage())
                            .build());
        }
    }






    @PostMapping(value = "/mobile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<LoginInfoDto>> mobileLogin(
            HttpServletResponse response
            , @RequestHeader(CommonConstant.companyKey) String companyKey
            , @RequestBody Map<String, String> requestBody) {


        try {
            String username = requestBody.get("username");
            String password = requestBody.get("password");

            var loginInfoDto = loginService.checkUser(companyKey, username);
            var mainUrl = loginService.getMainUrl(loginInfoDto.getMenuInfo());

            loginInfoDto = loginService.attemptMobileLogin(loginInfoDto, password);
            loginInfoDto.setMainUrl(mainUrl);

            TblComUserDto userDto = new TblComUserDto();
            userDto.setUserKey(loginInfoDto.getUserKey());
            userDto.setLoginStatus(LoginStatus.LOGIN.getCode());
            loginService.setLoginStatus(userDto);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<LoginInfoDto>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(loginInfoDto)
                            .build());
        } catch (SDKException exception) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<LoginInfoDto>builder()
                            .code(exception.getCode())
                            .msg(exception.getMessage())
                            .build());
        }
    }

    @GetMapping("/logout")
    public void logout(@AuthenticationPrincipal AWPUser user, HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 로그오프시 사용자 상태값 변경
        TblComUserDto userDto = new TblComUserDto();
        userDto.setUserKey(user.getLoginInfo().getUserKey());
        userDto.setLoginStatus(LoginStatus.LOGOFF.getCode());
        loginService.setLoginStatus(userDto);

        // 현재 요청의 모든 쿠키 가져오기
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                // 쿠키 삭제 (유효기간 0으로 설정)
                cookie.setValue("");
                cookie.setPath("/");
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }

        // /main으로 리다이렉트
        response.setStatus(HttpServletResponse.SC_OK); // 302 Redirect
        response.sendRedirect("/");
    }



    @Value("${wiz.jwt.secret}")
    private String secretKey;

    /*
        드림라인 토큰 생성
     */
    @GetMapping("/token/{userId}")
    @Deprecated(since = "드림라인 개발 끝나면")
    public String token(@PathVariable String userId) {

        Claims claims = Jwts.claims();
        claims.put("userId", userId);
        claims.setSubject(userId);
        claims.setId(userId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 8000 * 60 * 60 * 1000L))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

}
