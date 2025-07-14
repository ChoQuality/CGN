package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.UserDto;
import com.gsbizple.wiz.messenger.service.MsgUserApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/messenger/user")
@RestController
public class MsgUserApiController {

    private final MsgUserApiService msgUserApiService;

    /**
     * 유저정보조회
     *
     * @param userId int
     * @return UserDto
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDto<UserDto>> getUserInfo(@PathVariable int userId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgUserApiService.getUserInfo(userId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_USER_FETCH);
        }
    }

    @PostMapping("/search")
    public ResponseEntity<ResponseDto<List<UserDto>>> searchUser(@RequestBody UserDto userDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgUserApiService.getSearchUserList(userDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_USER_SEARCH);
        }
    }

}


