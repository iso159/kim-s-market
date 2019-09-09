package com.market.service;

import java.util.List;

import com.market.vo.Member;

public interface CrudService<T> {
	
	public abstract T getById(String id);
	
	public abstract List<T> get(T t);
	
	public abstract void save(T t);
	
	public abstract void modify(T t);
	
	public abstract void remove(String id);
}
