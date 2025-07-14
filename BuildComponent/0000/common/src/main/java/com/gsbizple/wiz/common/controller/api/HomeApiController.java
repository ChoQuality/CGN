package com.gsbizple.wiz.common.controller.api;

import com.gsbizple.wiz.common.dto.TblComOrgTreeDto;
import com.gsbizple.wiz.common.dto.TblComUserDto;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.service.ComUserService;
import com.gsbizple.wiz.common.service.LoginService;
import com.gsbizple.wiz.common.spec.SDKSpec;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/api/home")
@RestController
@RequiredArgsConstructor
public class HomeApiController {

    private final ComUserService comUserService;

    private final MessageSource messageSource;

    private final JWTComponent jwtComponent;
    private final LoginService loginService;

    /**
     * 사용자 목록 조회
     */
    @PostMapping("/getUserList")
    public ResponseEntity<ResponseDto<List<TblComUserDto>>> getResUserList(
            @RequestParam(name = "useFlag", required = false) Integer useFlag,
            @RequestParam(name="userNm", required = false) String userNm,
            @RequestParam(name="empNo", required = false) String empNo,
            @RequestParam(name="orgKey", required = false) Integer orgKey,
            @RequestParam(name="mobilePhoneNo", required = false) String mobilePhoneNo,
            @RequestParam(name="orgNm", required = false) String orgNm
    ) {
        try  {
            List<TblComUserDto> resultList = comUserService.findUserList(TblComUserDto.builder()
                    .useFlag(useFlag)
                    .userNm(userNm)
                    .empNo(empNo)
                    .orgKey(orgKey)
                    .mobilePhoneNo(mobilePhoneNo)
                    .orgNm(orgNm)
                    .build());

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, resultList);
        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_GET_USER_LIST);
        }
    }
//    ResponseEntity<ResponseDto<Object>>
    /**
     * 사용자 상세 조회
     */
    @PostMapping("/getUserInfo")
    public ResponseEntity<ResponseDto<TblComUserDto>> getUserInfo(@RequestBody TblComUserDto userDto) {
        try  {
            TblComUserDto result = comUserService.findUser(userDto);

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_GET_USER_INFO);
        }

    }

    /**
     * 사용자 상세 조회
     */
    @PostMapping("/getUserInfo/{inputUserKey}")
    public ResponseEntity<ResponseDto<TblComUserDto>> getUserInfo(@AuthenticationPrincipal AWPUser user, @PathVariable("inputUserKey") String inputUserKey) {
        try  {
            int userKey = Integer.parseInt(inputUserKey);
            TblComUserDto userDto = new TblComUserDto();
            userDto.setUserKey(userKey);

            TblComUserDto result = comUserService.findUser(userDto);
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_GET_USER_INFO);
        }
    }

    /**
     * 사용자 상태 변경
     */
    @PostMapping("/changeStatus")
    public ResponseEntity<ResponseDto<TblComUserDto>>  setUserLoginStatus(@AuthenticationPrincipal AWPUser user, @RequestBody TblComUserDto userDto) {

        try {
            if(userDto.getUserKey() == null) {
                userDto.setUserKey(user.getLoginInfo().getUserKey());
            }
            TblComUserDto result = comUserService.updateUserLoginStatus(userDto);

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);
        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_CHANGE_USER_STATUS);
        }

    }


    /**
     * 사용자 정보 수정
     */
    @PostMapping("/updateUserInfo")
    public ResponseEntity<ResponseDto<Object>> updateUserInfo(@AuthenticationPrincipal AWPUser user, @RequestBody TblComUserDto userDto) {
        try {
            if(userDto.getUserKey() == null) {
                userDto.setUserKey(user.getLoginInfo().getUserKey());
            }
            userDto.setCreateUserKey(user.getLoginInfo().getUserKey());
            int result = comUserService.updateUserInfo(userDto);

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);

        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_SET_USER_INFO);
        }
    }

    /**
     * 겸직의 경우 orgCd 변경
     */
    @PostMapping("/changeCookieOrgKey")
    public ResponseEntity<ResponseDto<Object>> changeCookieOrgKey(
            HttpServletResponse response
            , @AuthenticationPrincipal AWPUser user
            , @RequestBody TblComUserDto userDto
    ) {
        try {
            var loginInfoDto = user.getLoginInfo();
            loginInfoDto.setOrgName(userDto.getOrgNm());
            loginInfoDto.setOrgKey(userDto.getOrgKey());

            var cookie = loginService.createDefaultCookie();
            cookie.setValue(jwtComponent.createToken(loginInfoDto));
            response.addCookie(cookie);

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_UPDATE_MY_INFO);
        }
    }

    /**
     * 사용자 정보 수정
     */
    @PostMapping("/updateMyInfo")
    @ResponseBody
    public ResponseEntity<ResponseDto<Object>> updateMyInfo(
            HttpServletResponse response
            , @AuthenticationPrincipal AWPUser user
            , @RequestPart(value = "files", required = false) List<MultipartFile> files
            , @RequestPart("userDto")  TblComUserDto userDto
    ) {
        try {
            List<MultipartFile> fileList = Optional.ofNullable(files)
                    .orElseGet(Collections::emptyList)
                    .stream()
                    .filter(file -> file.getSize() > 0 && !Objects.requireNonNull(file.getOriginalFilename()).isEmpty())
                    .toList();

            userDto.setUserKey(Optional.ofNullable(userDto.getUserKey()).orElse(user.getLoginInfo().getUserKey()));
            userDto.setCreateUserKey(user.getLoginInfo().getUserKey());

            MultipartFile userImageFile = fileList.stream().findFirst().orElse(null);
            if (userImageFile == null || userImageFile.isEmpty()) {
                comUserService.updateMyInfo(userDto);
            }else{
                var imagePath = comUserService.updateMyInfoReturnPath(userDto, userImageFile, user.getLoginInfo().getSelectedDB());

                var loginInfoDto = user.getLoginInfo();
                loginInfoDto.setUserImageUrl(imagePath);

                var cookie = loginService.createDefaultCookie();
                cookie.setValue(jwtComponent.createToken(loginInfoDto));
                response.addCookie(cookie);
            }

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_UPDATE_MY_INFO);
        }
    }

    /**
     * 조직 트리 목록 조회
     */
    @PostMapping("/getOrgChart")
    public ResponseEntity<ResponseDto<Object>> getOrgTreeList(@AuthenticationPrincipal AWPUser user) {
        try {


            List<TblComOrgTreeDto> resultList = comUserService.findOrgTree(user.getLoginInfo().getCorpId());

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, resultList);

        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_GET_ORG_TREE);
        }

    }

    /**
     * 사용자 비밀번호 변경
     */
    @PostMapping("/updateUserPassword")
    public ResponseEntity<ResponseDto<Object>> updateUserPassword(@RequestBody TblComUserDto userDto) {
        try {

            int result = comUserService.updateUserPassword(userDto);

            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, result);

        } catch (Exception e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_HOME_UPDATE_PASSWORD);
        }
    }

}
