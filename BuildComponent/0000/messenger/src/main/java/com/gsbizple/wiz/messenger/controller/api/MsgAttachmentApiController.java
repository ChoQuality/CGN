package com.gsbizple.wiz.messenger.controller.api;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.service.ApiResponseUtil;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dto.AlarmDto;
import com.gsbizple.wiz.messenger.dto.AttachmentDto;
import com.gsbizple.wiz.messenger.dto.PaginationData;
import com.gsbizple.wiz.messenger.service.MsgAttachmentApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/messenger/attachment")
@RestController
@RequiredArgsConstructor
public class MsgAttachmentApiController {

    private final MsgAttachmentApiService msgAttachmentApiService;

    @GetMapping("/{roomId}/{pageNum}/{pageSize}/history")
    public ResponseEntity<ResponseDto<PaginationData>> getAttachmentHistory(@PathVariable String roomId, @PathVariable Integer pageNum, @PathVariable Integer pageSize) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAttachmentApiService.getAttachmentHistory(roomId, pageNum, pageSize));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_FILE_LIST_FETCH);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<ResponseDto<AttachmentDto>> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("roomId") String roomId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAttachmentApiService.attachmentUpload(file,roomId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_FILE_UPLOAD);
        }
    }

    @PostMapping("/uploads")
    public ResponseEntity<ResponseDto<List<AttachmentDto>>> uploadFiles(@RequestParam("files") List<MultipartFile> files, @RequestParam("roomId") String roomId) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAttachmentApiService.attachmentUploads(files,roomId));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_FILE_UPLOAD);
        }
    }

    @PostMapping("/deletes")
    public ResponseEntity<ResponseDto<List<AttachmentDto>>> deletes(@RequestBody List<AttachmentDto> attachmentDtoList) {
        try {
            return ApiResponseUtil.buildResponse(SDKSpec.SUCCESS, msgAttachmentApiService.attachmentDeletes(attachmentDtoList));
        } catch (SDKException e) {
            return ApiResponseUtil.buildResponse(SDKSpec.FAIL_FILE_UPLOAD);
        }
    }

    @GetMapping("/download/{attachmentId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Integer attachmentId) {
        try {
            AttachmentDto attachmentDto = msgAttachmentApiService.attachmentDownload(attachmentId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentDisposition(
                    ContentDisposition.builder("attachment")
                            .filename(UriUtils.encode(attachmentDto.getOriginFileName(), StandardCharsets.UTF_8.toString()))
                            .build());
            return ResponseEntity.status(HttpStatus.OK)
                    .headers(headers)
                    .contentLength(attachmentDto.getFileSize())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(attachmentDto.getResource());
        } catch (SDKException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }


}
