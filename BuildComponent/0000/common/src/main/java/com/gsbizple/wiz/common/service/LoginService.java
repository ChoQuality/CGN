package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.dto.LoginInfoDto;
import com.gsbizple.wiz.common.dto.LoginMenuInfoDto;
import com.gsbizple.wiz.common.dto.TblComUserDto;
import jakarta.servlet.http.Cookie;

import java.util.List;

public interface LoginService {
    LoginInfoDto check(String company, String username);
    LoginInfoDto checkUser(String company, String username);
    Cookie attemptLogin(LoginInfoDto loginInfoDto, String password);
    LoginInfoDto attemptMobileLogin(LoginInfoDto loginInfoDto, String password);
    List<LoginMenuInfoDto> attemptMenu(LoginInfoDto loginInfoDto);
    String getMainUrl(List<LoginMenuInfoDto> menuList);
    Cookie createDefaultCookie();
    void setLoginStatus(TblComUserDto userDto);
}
