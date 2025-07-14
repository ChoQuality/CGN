package com.gsbizple.wiz.ai.controller.view;

import com.gsbizple.wiz.ai.service.AiService;
import com.gsbizple.wiz.common.constant.view.ContextType;
import com.gsbizple.wiz.common.constant.view.ViewConstant;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.view.LayoutService;
import com.gsbizple.wiz.common.spec.SDKSpec;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Locale;
import java.util.function.Function;

@Controller
@RequestMapping("/ai/view/summary")
public class AiSummaryViewController {

    private final LayoutService layoutService;
    private final AiService aiService;


    public AiSummaryViewController(Function<ContextType, LayoutService> layoutService, AiService aiService) {
        this.layoutService = layoutService.apply(ContextType.AI_MAIN);
        this.aiService = aiService;
    }

    @GetMapping(value = "/main")
    public String mainView(@AuthenticationPrincipal AWPUser user, Model model, Locale locale) {

        this.layoutService.clean();
        this.layoutService.setLocale(locale);
        this.layoutService.setLoginInfo(user.getLoginInfo());
        this.layoutService.setFooterAWPUser("context/common/awpUser");
        this.layoutService.setContextScripts("context/ai/script/summary/mainScript");
        this.layoutService.setContextContent("context/ai/content/summary/content_summary");
        this.layoutService.setContextSub("context/ai/sub/summary/sub");

        model.addAttribute(ViewConstant.layoutService, this.layoutService);
        return "index";
    }

    @GetMapping(value = "/detail")
    public ResponseEntity<ResponseDto<String>> mainDetailView(
            @AuthenticationPrincipal AWPUser user,
            Locale locale
    ) {
        try {
            layoutService.clean();
            layoutService.setLocale(locale);
            layoutService.setLoginInfo(user.getLoginInfo());

            var responsesList = aiService.executeList("AiServiceMapper.getDbPrompts");
            this.layoutService.setData("SystemPromptList", responsesList, List.class);
            var convertedHtml = layoutService.convertHtml("context/ai/component/rfp/systemPromptList");

            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(convertedHtml)
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_VIEW_CHAT_LIST.getCode())
                            .msg(SDKSpec.FAIL_VIEW_CHAT_LIST.getMessage())
                            .build()
            );
        }
    }


}
