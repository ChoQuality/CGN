package com.gsbizple.wiz.common.spec.portlet;

import lombok.Getter;

@Getter
public enum EmploymentType {
    REGULAR("REGULAR","정규직"),
    CONTRACT("CONTRACT","계약직"),
    PARTNER("PARTNER", "협력직")
    ;

    private final String code;
    private final String description;

    EmploymentType(String code, String msg) {
        this.code = code;
        this.description = msg;
    }

}
