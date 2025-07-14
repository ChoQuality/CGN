package com.gsbizple.wiz.common.config.view;

import com.gsbizple.wiz.common.constant.view.ContextType;
import com.gsbizple.wiz.common.constant.view.StatusType;
import com.gsbizple.wiz.common.constant.view.ViewConstant;
import com.gsbizple.wiz.common.dto.LoginInfoDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.LoginService;
import com.gsbizple.wiz.common.service.view.LayoutService;
import com.gsbizple.wiz.common.service.view.LayoutUtilService;
import com.gsbizple.wiz.common.spec.SDKSpec;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;

import static com.gsbizple.wiz.common.spec.SDKSpec.FAIL_LAYOUT_SERVICE_SET_DATA;

@Configuration
public class ViewConfig {

    @Bean("ContextTypeDefault")
    public ContextType contextTypeDefault() {
        return ContextType.DEFAULT;
    }
    @Bean("ContextTypePortlet")
    public ContextType contextTypePortlet() {
        return ContextType.PORTLET;
    }
    @Bean("ContextTypeMessenger")
    public ContextType contextTypeMessenger() {
        return ContextType.MESSENGER;
    }
    @Bean("ContextTypeTodo")
    public ContextType contextTypeTodo() {
        return ContextType.TODO;
    }
    @Bean("ContextTypeWorks")
    public ContextType contextTypeWorks() {
        return ContextType.WORKS;
    }
    @Bean("ContextTypeHr")
    public ContextType contextTypeHr() {
        return ContextType.HR;
    }
    @Bean("ContextTypeAI")
    public ContextType contextTypeAI() {
        return ContextType.AI;
    }
    @Bean("ContextTypeERP")
    public ContextType ContextTypeERP() {
        return ContextType.ERP;
    }
    @Bean("ContextTypeAIMain")
    public ContextType ContextTypeAIMain() {
        return ContextType.AI_MAIN;
    }


    @Bean("StatusTypeDefault")
    public StatusType statusTypeDefault() {
        return StatusType.DEFAULT;
    }
    @Bean("StatusTypeERRLOGIN")
    public StatusType statusTypeERRLOGIN() {
        return StatusType.ERR_LOGIN;
    }
    @Bean("StatusTypeERR403")
    public StatusType statusType403() {
        return StatusType.ERR_403;
    }
    @Bean("StatusTypeERR500")
    public StatusType statusType500() {
        return StatusType.ERR_500;
    }


    @Bean
    public Function<ContextType,LayoutService> layoutServiceFunction(SpringTemplateEngine templateEngine, MessageSource messageSource, LoginService loginService, LayoutUtilService layoutUtilService) {
        return (type) -> new LayoutService() {
            private final LayoutUtilService innerlayoutUtilService = layoutUtilService;
            private final LoginService innerLoginService = loginService;
            private ContextType contextType = type;
            private String contextContent;
            private String contextSub;
            private String footerAWPUser;
            private final List<String> contextModals = new ArrayList<>();
            private final List<String> contextScripts = new ArrayList<>();
            private LoginInfoDto loginInfoDto;
            private final Map<String,Object> innerViewDataMap = new HashMap<>(){};
            private final Map<String,String> innerMessageSource = new HashMap<>(){};

            private final Function<String,String> funcLoadHtml = htmlPath -> {
                ClassPathResource resource = new ClassPathResource(htmlPath);
                try (InputStream inputStream = resource.getInputStream();
                     BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                    StringBuilder contentBuilder = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        contentBuilder.append(line).append("\n");
                    }
                    return contentBuilder.toString();

                } catch (IOException e) {
                    throw new SDKException(SDKSpec.FAIL_LOAD_HTML);
                }
            };

            @Override
            public void setLocale(Locale locale) {
                innerMessageSource.putAll(processMessageSource(locale));
                innerViewDataMap.put(ViewConstant.messageSource,innerMessageSource);
            }

            @Override
            public ContextType getContextType() {
                return contextType;
            }

            @Override
            public void setContextType(ContextType contextType) {
                this.contextType = contextType;
            }

            @Override
            public String getContextContent() {
                return this.contextContent;
            }

            @Override
            public void setContextContent(String path) {
                this.contextContent= processTemplate(path);
            }

            @Override
            public String getContextSub() {
                return this.contextSub;
            }

            @Override
            public void setContextSub(String path) {
                this.contextSub= processTemplate(path);
            }

            @Override
            public List<String> getContextModals() {
                return this.contextModals;
            }

            @Override
            public void setContextModals(String path) {
                this.contextModals.add(processTemplate(path));
            }

            @Override
            public String getFooterAWPUser() {
                return this.footerAWPUser;
            }

            @Override
            public void setFooterAWPUser(String path) {
                this.footerAWPUser = processTemplate(path);
            }

            @Override
            public List<String> getContextScripts() {
                return this.contextScripts;
            }

            @Override
            public void setContextScripts(String path) {
                this.contextScripts.add(processTemplate(path));
            }

            @Override
            public void setLoginInfo(LoginInfoDto loginInfoDto) {
                var menu = innerLoginService.attemptMenu(loginInfoDto);
                this.loginInfoDto = loginInfoDto;
                this.loginInfoDto.setMenuInfo(menu);
                innerViewDataMap.put(ViewConstant.loginInfoDto, this.loginInfoDto);
                innerViewDataMap.put(ViewConstant.layoutUtilService, this.innerlayoutUtilService);
            }

            @Override
            public LoginInfoDto getLoginInfo() {
                return this.loginInfoDto;
            }

            @Override
            public <D> void setData(String dataName,D data, Class<D> dataType) {

                if (!dataType.isInstance(data)) {
                    throw new SDKException(FAIL_LAYOUT_SERVICE_SET_DATA);
                }
                innerViewDataMap.put(dataName, new InnerViewData(data,dataType));
            }
            @Override
            public <D> D getData(String dataName) {
                return Optional.ofNullable(innerViewDataMap.get(dataName))
                        .filter(value -> value instanceof InnerViewData)
                        .map(value -> (InnerViewData) value)
                        .map(InnerViewData::getData)
                        .map(data -> (D) data)
                        .orElse((D)Optional.empty());
            }

            @Override
            public void clean() {
                this.innerViewDataMap.clear();
                this.contextModals.clear();
                this.contextScripts.clear();
            }

            @Override
            public String convertHtml(String path) {
                return processTemplate(path);
            }

            @Override
            public Map<String, String> getMessageSource() {
                return innerMessageSource;
            }

            @Override
            public LayoutUtilService getLayoutUtilService() {
                return this.innerlayoutUtilService;
            }

            private String processTemplate(String templateName) {
                Context context = new Context();
                context.setVariables(innerViewDataMap);
                var result = templateEngine.process(templateName, context);
                return result.toString();
            }

            private Map<String,String> processMessageSource(Locale locale) {
                var map = new HashMap<String,String>();
                map.put("view.messenger.sub.chat.list",messageSource.getMessage("view.messenger.sub.chat.list",null, locale));
                map.put("view.messenger.sub.new.chat",messageSource.getMessage("view.messenger.sub.new.chat",null, locale));
                map.put("view.messenger.sub.chat.placeholder",messageSource.getMessage("view.messenger.sub.chat.placeholder",null, locale));
                map.put("view.messenger.sub.search",messageSource.getMessage("view.messenger.sub.search",null, locale));
                return map;
            }
        };
    };

    public record InnerViewData(Object data, Class<?> aClass) {
        public <D> D getData() {
                return (D) this.aClass.cast(this.data);
        }
    }
}
