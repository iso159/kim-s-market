package com.market.constant;

public enum CommonType {
	DFAULT_TYPE;
	
	private String y;
	private String n;
	
	private CommonType() {
		y = "Y";
		n = "N";
	}

	public String getY() {
		return y;
	}

	public String getN() {
		return n;
	}	
}
