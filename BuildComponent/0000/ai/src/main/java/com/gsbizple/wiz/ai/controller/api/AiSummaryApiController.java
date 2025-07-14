package com.gsbizple.wiz.ai.controller.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gsbizple.wiz.ai.dto.ResponseWrapper;
import com.gsbizple.wiz.ai.service.AiService;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.spec.SDKSpec;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Controller
@RequestMapping("/ai/api/summary")
public class AiSummaryApiController {

    private final AiService aiService;
    private final WebClient webClient;

    public AiSummaryApiController(AiService aiService, @Qualifier("DefaultWebClient") WebClient webClient ) {
        this.aiService = aiService;
        this.webClient = webClient;
    }

    @PostMapping("/question")
    public ResponseEntity<?> handleUpload(
            @AuthenticationPrincipal AWPUser user,
            @RequestParam("question") String question,
            @RequestParam("sysPrompt") String sysPrompt,
            @RequestParam("files") MultipartFile file
    ) {
        String summaryServiceUrl = aiService.executeOne("AiServiceMapper.getUrl", 9);

        try {

            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            builder.part("service_id", String.valueOf(user.getLoginInfo().getCorpId()));
            builder.part("question", "문서 요약해 주세요.");
            builder.part("sysPrompt", sysPrompt);
            builder.part("file", file.getResource())
                    .filename(Objects.requireNonNull(file.getOriginalFilename()));

            WebClient.ResponseSpec responseSpec = webClient.post()
                    .uri(summaryServiceUrl)
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .body(BodyInserters.fromMultipartData(builder.build()))
                    .retrieve();

            String result = responseSpec.bodyToMono(String.class).block();


            var responseWrapper = ResponseWrapper.builder()
                    .userId(user.getLoginInfo().getUserKey())
                    .fileName(file.getOriginalFilename())
                    .sysPrompt(sysPrompt)
                    .userPrompt(question).build();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(result);
            if (root.get("code").asInt() != 200) {
                responseWrapper.setResult(String.valueOf(root.get("msg")));
                return ResponseEntity.ok(
                        ResponseDto.<String>builder()
                                .code(SDKSpec.FAIL.getCode())
                                .msg(SDKSpec.FAIL.getMessage())
                                .build()
                );
            }

            String responseText = root.path("data").asText();
            responseWrapper.setResult(responseText);

            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(responseText)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.ERROR.getCode())
                            .msg(SDKSpec.ERROR.getMessage())
                            .build()
            );
        }
    }

}
