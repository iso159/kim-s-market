package com.market.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.repository.MemberRepository;
import com.market.service.MemberService;
import com.market.vo.Member;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	MemberRepository memberRepository;
	
	@Override
	public void save(Member member) {
		memberRepository.save(member);
	}
}
