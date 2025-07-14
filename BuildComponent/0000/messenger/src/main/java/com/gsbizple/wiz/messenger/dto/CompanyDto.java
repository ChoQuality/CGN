package com.gsbizple.wiz.messenger.dto;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDto {

    private String companyId;
    private String companyName;
    private String companyPhone;
    private String companyEmail;
    private String companySeparator;
    private String isActive;
}