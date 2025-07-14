package com.gsbizple.wiz.common.service.view;

import com.gsbizple.wiz.common.constant.view.ContextType;
import com.gsbizple.wiz.common.dto.LoginInfoDto;

import java.util.List;
import java.util.Locale;
import java.util.Map;

public interface LayoutService {
    void setLocale(Locale locale);
    ContextType getContextType();
    void setContextType(ContextType contextType);
    String getContextContent();
    void setContextContent(String path);
    String getContextSub();
    void setContextSub(String path);
    List<String> getContextModals();
    void setContextModals(String path);
    String getFooterAWPUser();
    void setFooterAWPUser(String path);
    List<String> getContextScripts();
    void setContextScripts(String path);
    void setLoginInfo(LoginInfoDto loginInfoDto);
    LoginInfoDto getLoginInfo();
    <D> void setData(String dataName,D data,Class<D> dataType);
    <D> D getData(String dataName);
    void clean();
    String convertHtml(String path);
    Map<String,String> getMessageSource();
    LayoutUtilService getLayoutUtilService();
}
