package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.spec.SDKSpec;
import lombok.experimental.UtilityClass;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@UtilityClass
public class ApiResponseUtil {

    public <T> ResponseEntity<ResponseDto<T>> buildResponse(SDKSpec sdkSpec) {
        return buildResponse(sdkSpec, null, HttpStatus.OK);
    }

    public <T> ResponseEntity<ResponseDto<T>> buildResponse(SDKSpec sdkSpec, T data) {
        return buildResponse(sdkSpec, data, HttpStatus.OK);
    }

    public <T> ResponseEntity<ResponseDto<T>> buildResponse(SDKSpec sdkSpec, HttpStatus status) {
        return buildResponse(sdkSpec, null, status);
    }

    public <T> ResponseEntity<ResponseDto<T>> buildResponse(SDKSpec sdkSpec, T data, HttpStatus status) {
        return ResponseEntity.status(status).body(buildResponseEntityBody(sdkSpec, data));
    }

    public <T> ResponseDto<T> buildResponseEntityBody(SDKSpec sdkSpec, T data) {
        return ResponseDto.<T>builder()
                .code(sdkSpec.getCode())
                .msg(sdkSpec.getMessage())
                .data(data)
                .build();
    }
}