package com.gsbizple.wiz.common.filter;

import com.gsbizple.wiz.common.constant.JWTConstant;
import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import com.gsbizple.wiz.common.security.AWPUser;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Component
public class SocketHandShakeInterceptor implements HandshakeInterceptor {


    private final JWTComponent jwtComponent;

    public SocketHandShakeInterceptor(JWTComponent jwtComponent) {
        this.jwtComponent = jwtComponent;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
            var token = getToken(httpServletRequest);
            token.ifPresent(s -> {
                if(jwtComponent.checkToken(s)){
                    var loginInfo = jwtComponent.getLoginInfo(token.get());
                    DataSourceContextHolder.setDataSourceKey(loginInfo.getSelectedDB());
                    AWPUser awpUser = new AWPUser(loginInfo.getSelectedDB(),"****", Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),loginInfo);
                    var context = SecurityContextHolder.getContext();
                    context.setAuthentication(new PreAuthenticatedAuthenticationToken(awpUser,awpUser.getPassword(),awpUser.getAuthorities()));
                }
            });
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }

    private Optional<String> getToken(HttpServletRequest request) {
        return Arrays.stream(request.getCookies() != null ? request.getCookies() : new Cookie[0]  )
                .filter(cookie -> cookie.getName().equals(JWTConstant.CookieName))
                .findFirst()
                .map(Cookie::getValue)
                .filter(s -> !s.isEmpty());

    }
}
