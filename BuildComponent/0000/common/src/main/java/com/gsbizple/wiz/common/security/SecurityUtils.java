package com.gsbizple.wiz.common.security;

import com.gsbizple.wiz.common.dto.LoginInfoDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    // 유저정보
    public static LoginInfoDto getUserAttribute() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal == null) {
            return null;
        }
        if (principal instanceof AWPUser) {
            return ((AWPUser) principal).getLoginInfo();
        }
        return null;
    }

    // 사용자KEY
    public static Integer getUserKey() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal == null) {
            return null;
        }
        if (principal instanceof AWPUser awpUser) {
            return awpUser.getLoginInfo().getUserKey();
        }
        return null;
    }

    // 조직키
    public static Integer getOrgKey() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal == null) {
            return null;
        }
        if (principal instanceof AWPUser awpUser) {
            return awpUser.getLoginInfo().getOrgKey();
        }
        return null;
    }

    // 기업아이디
    public static Integer getCorporateId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal == null) {
            return null;
        }
        if (principal instanceof AWPUser awpUser) {
            return awpUser.getLoginInfo().getCorpId();
        }
        return null;
    }

    // 기업아이디
    public static String getSelectedDB() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal == null) {
            return null;
        }
        if (principal instanceof AWPUser awpUser) {
            return awpUser.getLoginInfo().getSelectedDB();
        }
        return null;
    }
}
