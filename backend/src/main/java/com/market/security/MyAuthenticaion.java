package com.market.security;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class MyAuthenticaion extends UsernamePasswordAuthenticationToken {
	
	private static final long serialVersionUID = 1L;
	
	private String id;
	
	private boolean isLogin;
		
	public MyAuthenticaion(String id, String password, List<GrantedAuthority> grantedAuthorityList, boolean isLogin) {
		super(id, password, grantedAuthorityList);
		this.id = id;
		this.isLogin = isLogin;
	}
}
