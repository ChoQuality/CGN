package com.gsbizple.wiz.common.controller.api;

import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.FileUtils;
import com.gsbizple.wiz.common.spec.FileDirType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Controller
@RequestMapping("/image")
@RestController
@RequiredArgsConstructor
public class ImageApiController {

    // 사용자 image 반환하기
    @GetMapping(value = "/user/{userKey}/{imageName}")
    public ResponseEntity<Resource> userImageView(@AuthenticationPrincipal AWPUser user, @PathVariable("userKey") Integer userKey, @PathVariable("imageName") String imageName) throws IOException {

        ResponseEntity<Resource> result=null;
        try {
            List<String> savePath = new ArrayList<>();
            savePath.add(Integer.toString(userKey));
            imageName = URLDecoder.decode(imageName, "UTF-8");
            Resource resource = FileUtils.download( user.getLoginInfo().getSelectedDB(), FileDirType.USER, savePath, imageName);
            if( resource != null) {
                File file = resource.getFile();

                // HttpHeaders headers = new HttpHeaders();
                // headers.add("Content-Type", Files.probeContentType(file.toPath()));
                // result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), headers, HttpStatus.OK);

                result = ResponseEntity.ok()
                        .cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).mustRevalidate())
                        .body(resource);
            } else {
                log.error("이미지를 찾지 못하였습니다. {}", imageName);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    // ROOM image 반환하기
    @GetMapping(value = "/room/{roomKey}/{imageYyyy}/{imageName}")
    public ResponseEntity<byte[]> roomImageView(@AuthenticationPrincipal AWPUser user, @PathVariable("roomKey") Integer roomKey, @PathVariable("imageYyyy") String imageYyyy, @PathVariable("imageName") String imageName) throws IOException {
        List<String> savePath = new ArrayList<>();
        savePath.add(Integer.toString(roomKey));
        savePath.add(imageYyyy);
        Resource resource = FileUtils.download(user.getLoginInfo().getSelectedDB(), FileDirType.ROOM, savePath, imageName);

        File file = resource.getFile();
        ResponseEntity<byte[]> result=null;
        try {
            HttpHeaders headers=new HttpHeaders();
            headers.add("Content-Type", Files.probeContentType(file.toPath()));
            result=new ResponseEntity<>(FileCopyUtils.copyToByteArray(file),headers,HttpStatus.OK );
        }catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
}
