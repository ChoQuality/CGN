package com.gsbizple.wiz.common.security;

import com.gsbizple.wiz.common.dto.LoginInfoDto;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
public class AWPUser extends User {

    private static final long serialVersionUID = 1L;
    private final LoginInfoDto loginInfo;

    public AWPUser(String username, String password, Collection<? extends GrantedAuthority> authorities,LoginInfoDto loginInfo) {
        super(username, password, authorities);
        this.loginInfo = loginInfo;
    }
    public AWPUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities,LoginInfoDto loginInfo) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.loginInfo = loginInfo;
    }
}
