package com.gsbizple.wiz.common.constant;

import java.util.regex.Pattern;

public class JWTConstant {
    public static final String CookieName = "AWP-Cookie";
    public static final String Header_Authorization = "Authorization";
    public static final Pattern Patten_Bearer = Pattern.compile("^Bearer (.+?)$");
    public static final String Claim_Org_Key = "Org_Key";
    public static final String Claim_Org_NM = "Org_NM";
    public static final String Claim_Corp_Id = "Corp_Id";
    public static final String Claim_User_Key = "User_Key";
    public static final String Claim_User_NM = "User_NM";
    public static final String Claim_User_IMG = "User_IMG";
    public static final String Claim_DB_Key = "WIZ-COMPANY";
    public static final long Twelve_hour_second = 3600*12;
    public static final String IssuerServer = "Gateway";
    public static final String Subject = "ai-token";
    public static final String Claim_Menu_Key = "User_Key";
}
