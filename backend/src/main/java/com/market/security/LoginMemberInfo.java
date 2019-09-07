package com.market.security;

public class LoginMemberInfo {
	
	private String memberId;
	
	private String authority;

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Override
	public String toString() {
		return "LoginMemberInfo [memberId=" + memberId + ", authority=" + authority + "]";
	}
}
