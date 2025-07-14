package com.gsbizple.wiz.common.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.gsbizple.wiz.common.constant.JWTConstant;
import com.gsbizple.wiz.common.dto.LoginInfoDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.time.Instant;

import static com.gsbizple.wiz.common.spec.SDKSpec.FAIL_JWT_INIT;
import static com.gsbizple.wiz.common.spec.SDKSpec.FAIL_JWT_VALID;

@Configuration
@RequiredArgsConstructor
public class JWTConfig {

    private final Environment environment;

    @Bean
    public JWTComponent jwtComponent(){
        var jwtComponent = new JWTComponent() {
            private String jwtSecret = "";
            private Algorithm algorithm;
            private JWTVerifier jwtVerifier;

            @Override
            public void initJWT(String key) {
                if(jwtSecret.isEmpty()){
                    this.jwtSecret = environment.getProperty(key);
                    assert this.jwtSecret != null;
                    this.algorithm = Algorithm.HMAC256(this.jwtSecret);
                    this.jwtVerifier = JWT.require(this.algorithm).build();

                } else {
                    throw new SDKException(FAIL_JWT_INIT);
                }
            }
            @Override
            public JWTVerifier getJwtVerifier() {
                return jwtVerifier;
            }

            @Override
            public String createToken(LoginInfoDto loginInfoDto) {
                var now = Instant.now();
                var signed = JWT.create()
                        .withIssuer(JWTConstant.IssuerServer)
                        .withSubject(JWTConstant.Subject)
                        .withClaim(JWTConstant.Claim_Org_Key,loginInfoDto.getOrgKey())
                        .withClaim(JWTConstant.Claim_Org_NM,loginInfoDto.getOrgName())
                        .withClaim(JWTConstant.Claim_Corp_Id,loginInfoDto.getCorpId())
                        .withClaim(JWTConstant.Claim_User_Key,loginInfoDto.getUserKey())
                        .withClaim(JWTConstant.Claim_User_NM,loginInfoDto.getUserName())
                        .withClaim(JWTConstant.Claim_User_IMG,loginInfoDto.getUserImageUrl())
                        .withClaim(JWTConstant.Claim_DB_Key,loginInfoDto.getSelectedDB())
                        .withIssuedAt(now)
                        .withExpiresAt(now.plusSeconds(JWTConstant.Twelve_hour_second))
                        .sign(this.algorithm);
                return signed;
            }
            @Override
            public boolean checkToken(String token) {
                try {
                    var decodedJWT = jwtVerifier.verify(token);
                    return validateToken(decodedJWT);
                } catch (ExpiredJwtException | TokenExpiredException e) {
                    return validateToken(JWT.decode(token));
                } catch (Exception e) {
                    throw new SDKException(FAIL_JWT_VALID);
                }
            }

            @Override
            public LoginInfoDto getLoginInfo(String token) {
                return LoginInfoDto.builder()
                        .orgKey(JWT.decode(token).getClaim(JWTConstant.Claim_Org_Key).asInt())
                        .orgName(JWT.decode(token).getClaim(JWTConstant.Claim_Org_NM).asString())
                        .corpId(JWT.decode(token).getClaim(JWTConstant.Claim_Corp_Id).asInt())
                        .userKey(JWT.decode(token).getClaim(JWTConstant.Claim_User_Key).asInt())
                        .userName(JWT.decode(token).getClaim(JWTConstant.Claim_User_NM).asString())
                        .userImageUrl(JWT.decode(token).getClaim(JWTConstant.Claim_User_IMG).asString())
                        .selectedDB(JWT.decode(token).getClaim(JWTConstant.Claim_DB_Key).asString())
                        .token(token)
                        .build();
            }

            private boolean validateToken(DecodedJWT decodedJWT){
                boolean result;
                result = decodedJWT.getIssuer().equals(JWTConstant.IssuerServer)
                        & decodedJWT.getSubject().equals(JWTConstant.Subject)
                        & decodedJWT.getClaim(JWTConstant.Claim_Org_Key) != null
                        & decodedJWT.getClaim(JWTConstant.Claim_Corp_Id) != null
                        & decodedJWT.getClaim(JWTConstant.Claim_User_Key) != null
                        ;
                return result;
            }
        };
        jwtComponent.initJWT("wiz.jwt.secret");
        return jwtComponent;
    }

}
