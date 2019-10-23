package com.market.vo;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class PageWrapper<T> {
	
	private T requestData;
	
	private List<T> result;
	
	private Pagination pagination;
	
	private long count;
	
	public T getRequestData() {
		return requestData;
	}

	public void setRequestData(T requestData) {
		this.requestData = requestData;
	}

	public List<T> getResult() {
		return result;
	}
	
	public void setResult(List<T> result) {
		this.result = result;
	}
	
	public Pagination getPagination() {
		return pagination;
	}
	
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "PageWrapper [requestData=" + requestData + ", result=" + result + ", pagination=" + pagination
				+ ", count=" + count + "]";
	}
}
