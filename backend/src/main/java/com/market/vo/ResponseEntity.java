package com.market.vo;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class ResponseEntity<T> {
	
	private List<T> result;
	
	private Pagination pagination;
	
	private long count;
	
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
		return "ResponseEntity [result=" + result + ", pagination=" + pagination + ", count=" + count + "]";
	}
}
