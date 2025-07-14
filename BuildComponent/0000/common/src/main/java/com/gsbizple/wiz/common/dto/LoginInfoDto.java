package com.gsbizple.wiz.common.dto;

import lombok.*;

import java.util.Comparator;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginInfoDto {

    @Setter
    private String selectedDB;

    @Setter
    private Integer orgKey;
    private Integer corpId;

    private Integer userKey;
    private String orgCode;
    @Setter
    private String orgName;

    @Setter
    private String userPw;

    private String userName;
    private String userId;
    private String userEmpNo;
    private String userAuthCode;
    private String userEmail;

    @Setter
    private String userImageUrl;

    @Setter
    private List<LoginMenuInfoDto> menuInfo;

    @Setter
    private String token;

    @Setter
    private String mainUrl;

    public List<LoginMenuInfoDto> getMenuList(int lvl) {
        return menuInfo.stream()
                .filter(loginMenuInfoDto -> loginMenuInfoDto.getMenuLvl() == lvl)
                .sorted(Comparator.comparing(this::getSortOrder))
                .toList();
    }

    public List<LoginMenuInfoDto> getSubMenuList(int lvl, int menuId) {
        return menuInfo.stream()
                .filter(loginMenuInfoDto -> loginMenuInfoDto.getMenuLvl() == lvl)
                .filter(loginMenuInfoDto -> loginMenuInfoDto.getMenuPath().contains("/"+menuId+"/") )
                .sorted(Comparator.comparing(this::getSortOrder))
                .toList();
    }

    private int getSortOrder(LoginMenuInfoDto loginMenuInfoDto) {
        return switch (loginMenuInfoDto.serviceCode()) {
            case LoginMenuInfoDto.MenuServiceCode.PORTLET -> 1;
            case LoginMenuInfoDto.MenuServiceCode.TODO -> 2;
            case LoginMenuInfoDto.MenuServiceCode.MESSENGER -> 3;
            case LoginMenuInfoDto.MenuServiceCode.WORKS -> 4;
            case LoginMenuInfoDto.MenuServiceCode.HR -> 5;
            default -> 6; // 다른 타입이 있으면 가장 마지막으로 정렬
        };
    }
}



