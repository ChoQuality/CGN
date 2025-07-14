package com.gsbizple.wiz.common.service;

import com.auth0.jwt.JWTVerifier;
import com.gsbizple.wiz.common.dto.KeycloakInfoDto;

public interface KeycloakProperties {
    KeycloakInfoDto getKeycloakInfo();
    JWTVerifier getJWTVerifier();
}
