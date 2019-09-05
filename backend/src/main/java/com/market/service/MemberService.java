package com.market.service;

import java.util.List;

import com.market.vo.Member;

public interface MemberService {
	
	public abstract Member getById(String id);
	
	public abstract List<Member> get(Member member);
	
	public abstract void save(Member member);
	
	public abstract void modify(Member member);
	
	public abstract void remove(String id);
}
