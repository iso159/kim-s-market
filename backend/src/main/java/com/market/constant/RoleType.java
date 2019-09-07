package com.market.constant;

public enum RoleType {
	DEFAULT_ROLE;
	
	private String roleAdmin;
	private String roleUser;
	private String roleSeller;
	
	private RoleType() {
		roleAdmin = "ADMIN";
		roleUser = "USER";
		roleSeller = "SELLER";
	}
	
	public String getRoleAdmin() {
		return roleAdmin;
	}
	public String getRoleUser() {
		return roleUser;
	}
	public String getRoleSeller() {
		return roleSeller;
	}
}
