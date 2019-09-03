package com.market.constant;

public enum PaginationType {
	DEFAULT_PAGE;
	
	/** 한 페이지당 게시글 수 **/
    private int pageSize;
    
    /** 한 블럭(range)당 페이지 수 **/
    private int rangeSize;

	PaginationType() {
		pageSize = 10;
		rangeSize = 5;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getRangeSize() {
		return rangeSize;
	}
}
