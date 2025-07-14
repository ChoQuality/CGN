package com.gsbizple.wiz.common.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseAIDto;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.dto.api.ai.ChatSummaryDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.spec.SDKSpec;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/api/ai")
@RestController
public class CommonAIApiController {

    private final String OPEN_AI_HEADER = "x-api-key";
    private final SqlSession sqlSession;
    private final Map<String,String> corporateAIKey;
    public CommonAIApiController(SqlSession sqlSession, @Qualifier("CorporateAIKey")Map<String,String> corporateAIKey) {
        this.sqlSession = sqlSession;
        this.corporateAIKey = corporateAIKey;
    }

    @PostMapping(path = "/chatSummary", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDto<ResponseAIDto<?>>> chatSummary(
            @AuthenticationPrincipal AWPUser user
            ,@RequestBody ChatSummaryDto data
    ) {
        try  {
            String chatSummaryUrl = sqlSession.selectOne("CommonAiMapper.getAiUrl",1);
            var xApiKey = corporateAIKey.get(user.getLoginInfo().getSelectedDB());
            var webClient = WebClient.builder().baseUrl(chatSummaryUrl).build();
            var responseAIDto = webClient.post()
                    .headers(header -> header.set(OPEN_AI_HEADER, xApiKey))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .bodyValue(data)
                    .retrieve()
                    .bodyToMono(ResponseAIDto.class)
                    .block();
            assert responseAIDto != null;
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<ResponseAIDto<?>>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(responseAIDto)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ResponseDto.<ResponseAIDto<?>>builder()
                            .code(SDKSpec.FAIL.getCode())
                            .msg(SDKSpec.FAIL.getMessage())
                            .build());
        }
    }



}
