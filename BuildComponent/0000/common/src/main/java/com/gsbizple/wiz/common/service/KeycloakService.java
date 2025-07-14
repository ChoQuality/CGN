package com.gsbizple.wiz.common.service;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.JsonNode;
import com.gsbizple.wiz.common.constant.JWTConstant;
import com.gsbizple.wiz.common.dto.KeycloakInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class KeycloakService {

    @Value("${keycloak.realms}")
    private String realms;

    @Value("${keycloak.admin.Id}")
    private String adminId;

    @Value("${keycloak.admin.password}")
    private String adminPassword;

    @Value("${keycloak.admin.clientId}")
    private String adminClientId;

    @Value("${keycloak.url}")
    private String keycloakUrl;

    @Value("${keycloak.clientId}")
    private String clientId;

    @Value("${keycloak.clientSecret}")
    private String clientSecret;

    private final WebClientService webClientService;

    public String getAccessToken(String userId, String password) {
        String token = webClientService.post(getAccessTokenEndpoint(), getRequestData(userId, password)
                        , JsonNode.class, null)
                .get("access_token").asText();
        return JWT.decode(token).getClaim(JWTConstant.Claim_DB_Key).asString();
    }

    public void addKeycloakUser(String email, String company, String password) {
        //addKeycloakUser("ddd@ddd.com","_0001_","1234");
        Map<String, Object> requestData = getAddUserRequestData(email, company, password);
        webClientService.post(getAddUserEndpoint(), requestData, JsonNode.class, getAdminToken());
    }

    public void modifyKeycloakPassword(String userId, String password) {
        //modifyKeycloakPassword("dd@dd.com","321");
        Map<String, Object> requestData = getModifyPasswordRequestData(password);
        webClientService.put(getModifyPasswordEndpoint(getKeycloakUserId(userId)), requestData, JsonNode.class, getAdminToken());
    }

    public KeycloakInfoDto getClientInfo() {
        return KeycloakInfoDto.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .realms(realms)
                .build();
    }
    private String getAdminToken() {
        return webClientService.post(getAdminTokenEndpoint(), getRequestData(adminId, adminPassword), JsonNode.class, null)
                .get("access_token").asText();
    }

    private String getKeycloakUserId(String userId) {
        return webClientService.get(getKeycloakUserIdEndpoint(userId), JsonNode.class, getAdminToken())
                .get(0).get("id").asText();
    }

    private MultiValueMap<String, String> getRequestData(Object username, String password) {
        // 예시 요청 데이터
        MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();
        if (String.valueOf(username).equals(adminId)) {
            requestData.add("client_id", adminClientId);
        } else {
            requestData.add("client_id", clientId);
            requestData.add("client_secret", clientSecret);
        }
        //키클락의 username == tbl_com_user의 userId
        requestData.add("username", String.valueOf(username));
        requestData.add("password", password);
        requestData.add("grant_type", "password");
        return requestData;
    }

    private String getAccessTokenEndpoint() {
        return keycloakUrl + "/realms/" + realms + "/protocol/openid-connect/token";
    }

    private String getAdminTokenEndpoint() {
        return keycloakUrl + "/realms/master/protocol/openid-connect/token";
    }

    private String getAddUserEndpoint() {
        return keycloakUrl + "/admin/realms/" + realms + "/users";
    }

    private String getModifyPasswordEndpoint(String userId) {
        return keycloakUrl + "/admin/realms/" + realms + "/users/" + userId + "/reset-password";
    }

    private String getKeycloakUserIdEndpoint(String userId) {
        return keycloakUrl + "/admin/realms/" + realms + "/users?username=" + userId;
    }


    private Map<String, Object> getAddUserRequestData(String email, String company, String password) {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("email", email);
        requestData.put("enabled", true);

        // attributes 설정
        Map<String, String> attributes = new HashMap<>();
        attributes.put("WIZ-COMPANY", company);
        requestData.put("attributes", attributes);

        // credentials 설정
        Map<String, Object> credentials = new HashMap<>();
        credentials.put("type", "password");
        credentials.put("value", password);
        credentials.put("temporary", false);
        requestData.put("credentials", List.of(credentials));
        return requestData;
    }


    private Map<String, Object> getModifyPasswordRequestData(String password) {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("type", "password");
        requestData.put("value", password);
        requestData.put("temporary", false);
        return requestData;
    }


}