package com.gsbizple.wiz.common.controller.view;

import com.gsbizple.wiz.common.constant.view.StatusType;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
@RequestMapping("/")
@RestController
@RequiredArgsConstructor
public class LoginViewController {

    private final LoginService loginService;

    @GetMapping
    public ModelAndView login(@RequestParam(name = "status",required = false,defaultValue = "default")String status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 사용자 (익명 사용자 포함) 처리
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken || !authentication.isAuthenticated()) {
            // 인증되지 않은 사용자는 로그인 페이지로 이동
            /*return new ModelAndView("login/testlogin");*/

            var model = new ModelAndView("login/login");
            if(status.equals("loginFail")){
                model.addObject("status",StatusType.ERR_LOGIN);
            } else {
                model.addObject("status",StatusType.DEFAULT);
            }
            return model;
        } else {
            AWPUser user = (AWPUser) authentication.getPrincipal();
            var menu = loginService.attemptMenu(user.getLoginInfo());
            var mainUrl = loginService.getMainUrl(menu);
            return new ModelAndView("redirect:"+ mainUrl);  // 여기를 리다이렉트하고 싶은 페이지로 수정
        }
    }

    @GetMapping(value = "keycloak")
    public ModelAndView keycloakLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 사용자 (익명 사용자 포함) 처리
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken || !authentication.isAuthenticated()) {
            // 인증되지 않은 사용자는 로그인 페이지로 이동
            return new ModelAndView("login/keycloakLogin");
        } else {
            AWPUser user = (AWPUser) authentication.getPrincipal();
            var menu = loginService.attemptMenu(user.getLoginInfo());
            var mainUrl = loginService.getMainUrl(menu);
            return new ModelAndView("redirect:"+ mainUrl);  // 여기를 리다이렉트하고 싶은 페이지로 수정
        }
    }
}
