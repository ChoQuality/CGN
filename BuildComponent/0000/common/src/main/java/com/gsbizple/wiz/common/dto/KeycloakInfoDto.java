package com.gsbizple.wiz.common.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
public class KeycloakInfoDto {
    @JsonIgnore
    private String realms;
    @JsonIgnore
    private String adminId;
    @JsonIgnore
    private String adminPassword;
    @JsonIgnore
    private String adminClientId;

    @JsonProperty("keycloak_url")
    private String keycloakUrl;

    @JsonProperty("client_id")
    private String clientId;

    @JsonProperty("client_secret")
    private String clientSecret;

    @JsonProperty("grant_type")
    private String grantType;

    @JsonProperty("scope")
    private String scope;
}



