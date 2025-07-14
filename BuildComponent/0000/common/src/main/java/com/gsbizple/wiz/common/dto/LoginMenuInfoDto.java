package com.gsbizple.wiz.common.dto;

import lombok.Data;

@Data
public class LoginMenuInfoDto {
    private Integer menuId;
    private String menuName;
    private String menuPath;
    private Integer menuLvl;
    private String menuIcoPath;
    private String menuType;
    private Integer isMenuDisplay;
    private String menuExecutePath;
    private Integer menuSortOrder;
    private Integer menuAuthFlag;
    private String menuServiceCode;

    public enum MenuType {
        NONE,
        FOLDER,
        PROGRAM,
        EXTERNAL
    }
    public enum MenuServiceCode {
        AWP
        ,PORTLET
        ,TODO
        ,MESSENGER
        ,WORKS
        ,HR
        ,AI
        ,ERP
    }

    public boolean isDisplay() {
        return isMenuDisplay != null && isMenuDisplay == 1;
    }
    public boolean isAuthed() {
        return menuAuthFlag != null && menuAuthFlag == 0;
    }
    public MenuType type() {
        return switch (menuType) {
            case "F" -> MenuType.FOLDER;
            case "P" -> MenuType.PROGRAM;
            case "E" -> MenuType.EXTERNAL;
            default -> MenuType.NONE;
        };
    }
    public MenuServiceCode serviceCode() {
        return switch (menuServiceCode) {
            case "PORTLET" -> MenuServiceCode.PORTLET;
            case "TODO" -> MenuServiceCode.TODO;
            case "MESSENGER" -> MenuServiceCode.MESSENGER;
            case "WORKS" -> MenuServiceCode.WORKS;
            case "HR" -> MenuServiceCode.HR;
            case "RFP" -> MenuServiceCode.AI;
            case "ERP" -> MenuServiceCode.ERP;
            default -> MenuServiceCode.AWP;
        };
    }
}
