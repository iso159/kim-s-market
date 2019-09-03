package com.market.vo;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class GenericObject<T> {
	T requestData;
	List<T> result;
	Pagination pagination;
	
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

	@Override
	public String toString() {
		return "GenericVo [requestData=" + requestData + ", result=" + result + ", pagination=" + pagination + "]";
	}
}
