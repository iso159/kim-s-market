package com.market.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.market.constant.RoleType;
import com.market.service.MemberService;
import com.market.util.HashUtil;
import com.market.vo.Member;

@Component("authProvider")
public class AuthProvider implements AuthenticationProvider {
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	Member member;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String id = authentication.getName();
		String password = authentication.getCredentials().toString();
		
		Member memberFromDB = memberService.getById(id);
		
		if( memberFromDB == null || !HashUtil.passwordMatch(password, memberFromDB.getPassword())) {
			return null;
		}
		
		List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
        
        // 로그인한 계정에게 권한 부여
        if (memberFromDB.getAuthority().equals("ADMIN")) {
            grantedAuthorityList.add(new SimpleGrantedAuthority(RoleType.DEFAULT_ROLE.getRoleAdmin()));
        } else if(memberFromDB.getAuthority().equals("SELLER")) {
        	grantedAuthorityList.add(new SimpleGrantedAuthority(RoleType.DEFAULT_ROLE.getRoleSeller()));
        } else {
        	grantedAuthorityList.add(new SimpleGrantedAuthority(RoleType.DEFAULT_ROLE.getRoleUser()));
        }
 
        // 로그인 성공시 로그인 사용자 정보 반환
        return new MyAuthenticaion(id, password, grantedAuthorityList, true);
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}
