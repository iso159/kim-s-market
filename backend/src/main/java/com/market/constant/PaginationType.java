package com.market.constant;

public enum PaginationType {
	DEFAULT_PAGE;
	
	/** 한 페이지당 게시글 수 **/
    private int pageSize;
    
    /** 한 블럭(range)당 페이지 수 **/
    private int rangeSize;
    
    /** 시작 페이지 **/
    private int startPage;

	PaginationType() {
		pageSize = 10;
		rangeSize = 5;
		startPage = 0;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getRangeSize() {
		return rangeSize;
	}

	public int getStartPage() {
		return startPage;
	}
}
