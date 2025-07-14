package com.gsbizple.wiz.common.config;

import com.gsbizple.wiz.common.constant.CommonConstant;
import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import com.gsbizple.wiz.common.dto.LoginInfoDto;
import com.gsbizple.wiz.common.dto.LoginMenuInfoDto;
import com.gsbizple.wiz.common.dto.TblComUserDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import com.gsbizple.wiz.common.service.ComUserService;
import com.gsbizple.wiz.common.service.LoginService;
import com.gsbizple.wiz.common.spec.SDKSpec;
import jakarta.servlet.http.Cookie;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import java.util.*;

import static com.gsbizple.wiz.common.constant.JWTConstant.CookieName;

@Configuration
public class AuthConfig {

    private final SqlSession sqlSession;

    public AuthConfig(
            @Qualifier("AWPSession") SqlSession sqlSession
    ) {
        this.sqlSession = sqlSession;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return user -> {
            return new UserDetails() {
                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
                }

                @Override
                public String getPassword() {
                    return "*****";
                }

                @Override
                public String getUsername() {
                    return user;
                }
            };
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new AuthenticationProvider() {
            @Override
            public Authentication authenticate(Authentication authentication) throws AuthenticationException {
                return authentication;
            }

            @Override
            public boolean supports(Class<?> authentication) {
                return true;
            }
        };
    }

    @Bean
    public LoginService loginService(
            AuthenticationProvider authenticationProvider
            , @Qualifier("CorporateId") Map<String, Integer> corporateId
            , JWTComponent jwtComponent
            , PasswordEncoder passwordEncoder
            , ComUserService comUserService
    ) {
        return new LoginService() {
            @Override
            public LoginInfoDto check(String corporate_id, String username) {
                Map<String, String> map = new HashMap<>();
                map.put("corporate_id", corporate_id);
                map.put("user_id", username);
                map.put("use_flag", CommonConstant.USE);
                var loginInfoDto = (LoginInfoDto) sqlSession.selectOne("LoginMapper.attemptLogin", map);
                if(loginInfoDto == null){
                    throw new SDKException(SDKSpec.ERROR_LOGIN_ID);
                }
                return loginInfoDto;
            }

            @Override
            public LoginInfoDto checkUser(String company, String username) {
                Map<String, String> map = new HashMap<>();
                map.put("corporate_id", corporateId.get(company).toString());
                map.put("user_id", username);
                map.put("use_flag", CommonConstant.USE);
                var loginInfoDto = (LoginInfoDto) sqlSession.selectOne("LoginMapper.attemptLogin", map);
                if(loginInfoDto == null){
                    throw new SDKException(SDKSpec.ERROR_LOGIN_ID);
                }
                loginInfoDto.setSelectedDB(company);
                var result = this.attemptMenu(loginInfoDto);
                loginInfoDto.setMenuInfo(result);
                return loginInfoDto;
            }

            @Override
            public Cookie createDefaultCookie() {
                Cookie cookie = new Cookie(CookieName, "");
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setMaxAge(60 * 60 * 24); // 24시간
                return cookie;
            }

            private Authentication createAuthentication(LoginInfoDto loginInfoDto, String password) {
                if (passwordEncoder.matches(password, loginInfoDto.getUserPw())) {
                    return getPreAuthenticatedAuthenticationToken(loginInfoDto);
                } else {
                    return new PreAuthenticatedAuthenticationToken(loginInfoDto, "****");
                }
            }

            private static PreAuthenticatedAuthenticationToken getPreAuthenticatedAuthenticationToken(LoginInfoDto loginInfoDto) {
                loginInfoDto.setUserPw("****");
                SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
                List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                grantedAuthorities.add(simpleGrantedAuthority);
                return new PreAuthenticatedAuthenticationToken(loginInfoDto, "****", grantedAuthorities);
            }

            @Override
            public Cookie attemptLogin(LoginInfoDto loginInfoDto, String password) {
                var cookie = createDefaultCookie();
                if (loginInfoDto == null) {
                    return cookie;
                }
                Authentication authentication = createAuthentication(loginInfoDto, password);
                var result = authenticationProvider.authenticate(authentication);
                if (result.isAuthenticated()) {
                    cookie.setValue(jwtComponent.createToken(loginInfoDto));
                } else {
                    cookie.setValue("");
                }
                return cookie;
            }

            @Override
            public LoginInfoDto attemptMobileLogin(LoginInfoDto loginInfoDto, String password) {

                Authentication authentication = createAuthentication(loginInfoDto, password);
                var result = authenticationProvider.authenticate(authentication);
                if (result.isAuthenticated()) {
                    loginInfoDto.setToken(jwtComponent.createToken(loginInfoDto));
                    return loginInfoDto;
                } else {
                    throw new SDKException(SDKSpec.FAIL_LOGIN);
                }
            }

            @Override
            public List<LoginMenuInfoDto> attemptMenu(LoginInfoDto loginInfoDto) {
                return sqlSession.selectList("LoginMapper.attemptMenu", loginInfoDto.getUserKey());
            }

            @Override
            public String getMainUrl(List<LoginMenuInfoDto> menuList) {
                return menuList.stream()
                        .filter(loginMenuInfoDto -> loginMenuInfoDto.getMenuLvl() == 0)
                        .map(LoginMenuInfoDto::getMenuExecutePath)
                        .findFirst()
                        .orElse("/");
            }

            @Override
            public void setLoginStatus(TblComUserDto userDto){
                comUserService.updateUserLoginStatus(userDto);
            }


        };
    }
}
