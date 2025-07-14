package com.gsbizple.wiz.common.exception;

import com.gsbizple.wiz.common.spec.SDKSpec;


public class SDKException extends RuntimeException {
    private final int code;
    private final String message;

    public SDKException(SDKSpec SDKSpec) {
        this.code = SDKSpec.getCode();
        this.message = SDKSpec.getMessage();
    }

    public SDKException(SDKSpec SDKSpec, String message) {
        this.code = SDKSpec.getCode();
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
    public int getCode() {
        return code;
    }
}
