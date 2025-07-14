package com.gsbizple.wiz.common.filter;

import com.gsbizple.wiz.common.constant.JWTConstant;
import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import com.gsbizple.wiz.common.security.AWPUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;



public class JwtCookieFilter extends OncePerRequestFilter {

    private final JWTComponent jwtComponent;
    public JwtCookieFilter(JWTComponent jwtComponent) {
        this.jwtComponent = jwtComponent;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        var token = getToken(request);
        token.ifPresent(s -> {
            if(jwtComponent.checkToken(s)){
                var loginInfo = jwtComponent.getLoginInfo(token.get());
                DataSourceContextHolder.setDataSourceKey(loginInfo.getSelectedDB());
                AWPUser awpUser = new AWPUser(loginInfo.getSelectedDB(),"****", Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),loginInfo);
                var context = SecurityContextHolder.getContext();
                context.setAuthentication(new PreAuthenticatedAuthenticationToken(awpUser,awpUser.getPassword(),awpUser.getAuthorities()));
            }
        });
        try {
            filterChain.doFilter(request, response);
        } finally {
            DataSourceContextHolder.clear();
        }
    }

    private Optional<String> getToken(HttpServletRequest request) {
        return Arrays.stream(request.getCookies() != null ? request.getCookies() : new Cookie[0]  )
                .filter(cookie -> cookie.getName().equals(JWTConstant.CookieName))
                .findFirst()
                .map(Cookie::getValue)
                .filter(s -> !s.isEmpty());

    }
}
