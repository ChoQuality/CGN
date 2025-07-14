package com.gsbizple.wiz.common.jwt;

import com.auth0.jwt.JWTVerifier;
import com.gsbizple.wiz.common.dto.LoginInfoDto;

public interface JWTComponent {
    void initJWT(String key);
    JWTVerifier getJwtVerifier();
    String createToken(LoginInfoDto loginInfoDto);
    boolean checkToken(String token);
    LoginInfoDto getLoginInfo(String token);
}
