package com.gsbizple.wiz.messenger.controller.view;

import com.gsbizple.wiz.common.constant.view.ContextType;
import com.gsbizple.wiz.common.constant.view.ViewConstant;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.view.LayoutService;
import com.gsbizple.wiz.messenger.service.MsgRoomApiService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Locale;
import java.util.function.Function;

@Controller
@RequestMapping("/messenger")
public class MsgMessengerViewController {

    private final LayoutService layoutService;
    private final MsgRoomApiService msgRoomApiService;

    public MsgMessengerViewController(Function<ContextType, LayoutService> layoutService, MsgRoomApiService msgRoomApiService) {
        this.layoutService = layoutService.apply(ContextType.MESSENGER);
        this.msgRoomApiService = msgRoomApiService;
    }

    @GetMapping(value = "/main")
    public String mainView(@AuthenticationPrincipal AWPUser user, Model model, Locale locale) {

        this.layoutService.clean();
        this.layoutService.setLocale(locale);
        this.layoutService.setLoginInfo(user.getLoginInfo());
        this.layoutService.setFooterAWPUser("context/common/awpUser");
        this.layoutService.setContextScripts("context/messenger/script/main/mainScript");

        this.layoutService.setContextContent("context/messenger/content/content");
        this.layoutService.setContextSub("context/messenger/sub/sub");
        this.layoutService.setContextModals("context/messenger/modal/createChatModal");
        model.addAttribute(ViewConstant.layoutService, this.layoutService);
        return "index";
    }

    @GetMapping(value = "/login/websocket")
    public ModelAndView webSocketTest(ModelAndView modelAndView) {
        modelAndView.setViewName("websocket_test");
        return modelAndView;
    }
}