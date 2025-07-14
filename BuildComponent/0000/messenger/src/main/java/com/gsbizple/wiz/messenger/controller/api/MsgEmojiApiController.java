package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.EmojiDto;
import com.gsbizple.wiz.messenger.service.MsgEmojiApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/messenger/emoji")
@RestController
public class MsgEmojiApiController {

    private final MsgEmojiApiService msgEmojiApiService;

    /**
     * 이모지 생성
     * @param emojiDto
     * @return
     */
    @PostMapping("/create")
    public ResponseEntity<ResponseDto<List<EmojiDto>>> insertOrUpdateEmoji(@RequestBody EmojiDto emojiDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgEmojiApiService.insertOrUpdateEmoji(emojiDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_EMOJI_CREATE);
        }
    }


    /**
     * 이모지타입으로 묶어서 조회
     * @param emojiDto
     * @return
     */
    @PostMapping("/find/group")
    public ResponseEntity<ResponseDto<List<EmojiDto>>> findGroupByEmoji(@RequestBody EmojiDto emojiDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgEmojiApiService.findGroupByEmoji(emojiDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_EMOJI_FIND_GROUP);
        }
    }

    /**
     * 이모지 제거
     * @param emojiDto
     * @return
     */
    @PostMapping("/delete")
    public ResponseEntity<ResponseDto<List<EmojiDto>>> deleteEmoji(@RequestBody EmojiDto emojiDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgEmojiApiService.deleteEmoji(emojiDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_EMOJI_DELETE);
        }
    }

}


