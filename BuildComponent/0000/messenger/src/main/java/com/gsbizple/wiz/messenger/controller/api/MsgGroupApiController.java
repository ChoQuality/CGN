package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.GroupDto;
import com.gsbizple.wiz.messenger.dto.UserDto;
import com.gsbizple.wiz.messenger.service.MsgGroupApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/messenger/group")
@RestController
public class MsgGroupApiController {

    private final MsgGroupApiService msgGroupApiService;

    /**
     * 전체 조직정보 조회
     *
     * @return List<GroupDto
     */
    @GetMapping("/orgList")
    public ResponseEntity<ResponseDto<List<GroupDto>>> getOrgList() {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgGroupApiService.getOrgList());
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_GROUP_FETCH);
        }
    }

    /**
     * 조직명 조회
     *
     * @param groupDto GroupDto
     * @return List<GroupDto>
     */
    @GetMapping("/search/{keyword}")
    public ResponseEntity<ResponseDto<List<GroupDto>>> searchByOrgName(GroupDto groupDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgGroupApiService.getGroupSearchList(groupDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_GROUP_NAME_FETCH);
        }
    }

    /**
     * 그룹의 사용자 목록 조회
     *
     * @param groupDto GroupDto
     * @return List<UserDto>
     */
    @GetMapping("/groupUserList/{orgKey}")
    public ResponseEntity<ResponseDto<List<UserDto>>> getGroupUserList(GroupDto groupDto) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgGroupApiService.getGroupUserList(groupDto));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_GROUP_USER_LIST_FETCH);
        }
    }

}
