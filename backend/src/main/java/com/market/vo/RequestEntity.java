package com.market.vo;

public class RequestEntity<T> {
	
	private T requestData;
	
	private Pagination pagination;
	
	
	public T getRequestData() {
		return requestData;
	}
	
	public void setRequestData(T requestData) {
		this.requestData = requestData;
	}
	
	public Pagination getPagination() {
		return pagination;
	}
	
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

	@Override
	public String toString() {
		return "RequestEntity [requestData=" + requestData + ", pagination=" + pagination + "]";
	}	
	
}
