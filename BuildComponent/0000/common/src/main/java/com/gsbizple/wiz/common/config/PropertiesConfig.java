package com.gsbizple.wiz.common.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.gsbizple.wiz.common.dto.KeycloakInfoDto;
import com.gsbizple.wiz.common.service.KeycloakProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Configuration
public class PropertiesConfig {

    private final Map<String, String> innerProperties;
        private final Environment environment;

    public PropertiesConfig(Environment environment) {
        innerProperties = new HashMap<>();
        this.environment = environment;
    }

    @Bean("ComponentProperties")
    public Map<String, String> innerProperties() {
        innerProperties.put("component.mybatis.config",environment.getProperty("component.mybatis.config"));
        return innerProperties;
    }

    @Bean("MapperXml")
    public String[] mybatisMapperXml() {
        return this.environment.getProperty("component.mybatis.map", String[].class);
    }

    @Bean("KeycloakPropertiesBean")
    public KeycloakProperties keycloakProperties() {

        Boolean keycloakEnabled = this.environment.getProperty("keycloak.enabled", Boolean.class);

        Function<Boolean, KeycloakInfoDto> makeKeycloakInfoDto = isKeycloakEnabled  -> {
            KeycloakInfoDto keycloakInfoDto = KeycloakInfoDto.builder().build();
            if(isKeycloakEnabled){
                keycloakInfoDto = KeycloakInfoDto.builder()
                        .realms(this.environment.getProperty("keycloak.realms"))
                        .clientId(this.environment.getProperty("keycloak.clientId"))
                        .clientSecret(this.environment.getProperty("keycloak.clientSecret"))
                        .grantType(this.environment.getProperty("keycloak.grantType"))
                        .scope(this.environment.getProperty("keycloak.scope"))
                        .keycloakUrl(this.environment.getProperty("keycloak.url"))
                        .adminId(this.environment.getProperty("keycloak.admin.Id"))
                        .adminPassword(this.environment.getProperty("keycloak.admin.password"))
                        .adminClientId(this.environment.getProperty("keycloak.admin.clientId"))
                        .build();
            }
            return keycloakInfoDto;
        };
        Function<KeycloakInfoDto, JWTVerifier> makeKeycloakJWTVerifier = keycloakInfo  -> {
            byte[] decodedSecret = Base64.getDecoder().decode(keycloakInfo.getClientSecret());
            String decodedSecretString = new String(decodedSecret);  // 디코딩
            var algorithm = Algorithm.HMAC256(decodedSecretString);
            return JWT.require(algorithm).build();
        };


        var keycloakInfoDto = makeKeycloakInfoDto.apply(Boolean.TRUE.equals(keycloakEnabled));
        var keycloakVerifier = makeKeycloakJWTVerifier.apply(keycloakInfoDto);
        return  new KeycloakProperties() {

            @Override
            public KeycloakInfoDto getKeycloakInfo() {
                return keycloakInfoDto;
            }

            @Override
            public JWTVerifier getJWTVerifier() {
                return keycloakVerifier;
            }
        };


    }

}
