package com.market.vo;

import com.market.constant.PaginationType;

public class Pagination {
    /** 한 페이지당 게시글 수 **/
    private int pageSize = PaginationType.DEFAULT_PAGE.getPageSize();
    
    /** 한 블럭(range)당 페이지 수 **/
    private int rangeSize = PaginationType.DEFAULT_PAGE.getRangeSize();
    
    /** 총 게시글 수 **/
    private long listCnt;
    
    /** 현재 페이지 **/
    private int curPage;
    
    /** 현재 블럭(range) **/
    private int curRange;
    
    /** 총 페이지 수 **/
    private int pageCnt;
    
    /** 총 블럭(range) 수 **/
    private int rangeCnt;
    
    /** 시작 페이지 **/
    private int startPage = PaginationType.DEFAULT_PAGE.getStartPage();
    
    /** 끝 페이지 **/
    private int endPage;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRangeSize() {
		return rangeSize;
	}

	public void setRangeSize(int rangeSize) {
		this.rangeSize = rangeSize;
	}

	public long getListCnt() {
		return listCnt;
	}

	public void setListCnt(long listCnt) {
		this.listCnt = listCnt;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getCurRange() {
		return curRange;
	}

	public void setCurRange(int curRange) {
		this.curRange = curRange;
	}

	public int getPageCnt() {
		return pageCnt;
	}

	public void setPageCnt(int pageCnt) {
		this.pageCnt = pageCnt;
	}

	public int getRangeCnt() {
		return rangeCnt;
	}

	public void setRangeCnt(int rangeCnt) {
		this.rangeCnt = rangeCnt;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	@Override
	public String toString() {
		return "Pagination [pageSize=" + pageSize + ", rangeSize=" + rangeSize + ", listCnt=" + listCnt + ", curPage="
				+ curPage + ", curRange=" + curRange + ", pageCnt=" + pageCnt + ", rangeCnt=" + rangeCnt
				+ ", startPage=" + startPage + ", endPage=" + endPage + "]";
	}
}
