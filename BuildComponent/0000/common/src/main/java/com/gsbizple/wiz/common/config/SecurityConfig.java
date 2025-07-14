package com.gsbizple.wiz.common.config;

import com.gsbizple.wiz.common.filter.BearerFilter;
import com.gsbizple.wiz.common.filter.HeaderFilter;
import com.gsbizple.wiz.common.filter.JwtCookieFilter;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.NullSecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
public class SecurityConfig {


    private final HttpSecurity httpSecurity;
    private final AuthenticationProvider authenticationProvider;
    private final OncePerRequestFilter apiFilter;
    private final OncePerRequestFilter mobileFilter;
    private final OncePerRequestFilter headerFilter;

    public SecurityConfig(HttpSecurity httpSecurity, AuthenticationProvider authenticationProvider, JWTComponent jwtComponent) {
        this.httpSecurity = httpSecurity;
        this.authenticationProvider = authenticationProvider;
        this.apiFilter = new JwtCookieFilter(jwtComponent);
        this.mobileFilter = new BearerFilter(jwtComponent);
        this.headerFilter = new HeaderFilter();
    }


    @Bean
    public SecurityFilterChain getSecurityFilterChain() throws Exception {
        httpSecurity.cors(corsSpec -> corsSpec.configurationSource(corsConfigurationSource()))
                .authenticationProvider(authenticationProvider)
                .csrf(AbstractHttpConfigurer::disable)
                .headers(httpSecurityHeadersConfigurer -> httpSecurityHeadersConfigurer.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .addFilterBefore(headerFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(apiFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(mobileFilter, UsernamePasswordAuthenticationFilter.class)
                .securityContext((securityContext) ->
                        securityContext
                                .securityContextRepository(new NullSecurityContextRepository())
                )
                .sessionManagement(sessionManagementConfigurer ->
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeExchangeSpec -> authorizeExchangeSpec
                        .requestMatchers(HttpMethod.GET,"/assets/css/**","/assets/fonts/**","/assets/vendors/multiupload/**","/assets/js/**","/assets/images/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/static/js/**","/static/css/**","/static/assets/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/image/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/image/**").permitAll()

                        .requestMatchers(HttpMethod.POST
                                ,"/error"
                                ,"/messenger/**"
                                ,"/ai/**"
                                ,"/todo/**"
                                ,"/websocket/**"
                                ,"/portlet/**"
                                ,"/portlet/env/**"
                                ,"/test/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET
                                ,"/ai/**"
                                ,"/messenger/**","/websocket/**"
                                ,"/todo/**","/praise/**", "/report/**"
                                ,"/portlet/**","/portlet/env/**"
                                ,"/test/**"
                        ).permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/interface/**", "/api/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/login/**","/login/logout","/login/keycloak/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/login/**","/login/mobile","/login/keycloak/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/","/keycloak").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS).denyAll()
                        .requestMatchers(HttpMethod.GET).denyAll()
                        .requestMatchers(HttpMethod.POST).denyAll()
                        .requestMatchers(HttpMethod.PUT).denyAll()
                        .requestMatchers(HttpMethod.DELETE).denyAll())
        ;
        return httpSecurity.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        configuration.setMaxAge(3600L);
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
