package com.gsbizple.wiz.common.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.gsbizple.wiz.common.constant.JWTConstant;
import com.gsbizple.wiz.common.jwt.JWTComponent;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class JWTVerifierService {
    private final JWTVerifier jwtVerifier;

    public JWTVerifierService(JWTComponent jwtComponent) {
        this.jwtVerifier = jwtComponent.getJwtVerifier();
    }

    public Authentication check(String token, HttpServletRequest request) {
        DecodedJWT decodedJWT;
        try {
            decodedJWT = this.jwtVerifier.verify(token);

            if (isValidJWT(decodedJWT)) {
                return createAuthentication(decodedJWT,request,false);
            } else {
                return createEmptyAuthentication();
            }
        } catch (TokenExpiredException e) {
            decodedJWT = JWT.decode(token);
            if (isValidJWT(decodedJWT)) {
                return createAuthentication(decodedJWT,request,true);
            } else {
                return createEmptyAuthentication();
            }

        } catch (Exception e) {
            return createEmptyAuthentication();
        }
    }

    public boolean check(String token) {
        DecodedJWT decodedJWT;
        try {
            decodedJWT = this.jwtVerifier.verify(token);

            if (isValidJWT(decodedJWT)) {
                return true;
            }

        } catch (TokenExpiredException e) {
            decodedJWT = JWT.decode(token);
            return isValidJWT(decodedJWT);
        } catch (Exception e) {
            return false;
        }
        return false;
    }


    private boolean isValidJWT(DecodedJWT decodedJWT) {
        return decodedJWT.getIssuer().equals(JWTConstant.IssuerServer) &&
                decodedJWT.getSubject().equals(JWTConstant.Subject) &&
                decodedJWT.getClaim(JWTConstant.Claim_Corp_Id) != null &&
                decodedJWT.getClaim(JWTConstant.Claim_Org_Key) != null &&
                decodedJWT.getClaim(JWTConstant.Claim_User_Key) != null
                ;
    }

    private Authentication createAuthentication(DecodedJWT decodedJWT,HttpServletRequest request,boolean isExpired) {
//        var company = decodedJWT.getClaim(AuthConstantValue.jwt_claimCompany).asString();
        var corpId = decodedJWT.getClaim(JWTConstant.Claim_Corp_Id).asString();
        var orgKey = decodedJWT.getClaim(JWTConstant.Claim_Org_Key).asString();
        var userKey = decodedJWT.getClaim(JWTConstant.Claim_User_Key).asString();

//        var user = isExpired
//                ? new User(userId,"****",false,true,true,true,authorities)
//                : new User(userId,"****",authorities);

        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return List.of();
            }

            @Override
            public String getPassword() {
                return "";
            }

            @Override
            public String getUsername() {
                return "";
            }
        };
        var authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, "****", userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authenticationToken;
    }
    private Authentication createEmptyAuthentication() {
        return new UsernamePasswordAuthenticationToken(Optional.empty(), Optional.empty());
    }
}
