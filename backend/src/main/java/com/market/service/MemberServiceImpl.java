package com.market.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.MemberRepository;
import com.market.util.HashUtil;
import com.market.vo.Member;

@Service
public class MemberServiceImpl {

	@Autowired
	MemberRepository memberRepository;
	
	public Member getById(String id) {
		
		return memberRepository.findById(id).orElse(null);
	}
	
	public void save(Member member) {
		String encryptPassword = HashUtil.passwordEncryptor(member.getPassword());
		member.setPassword(encryptPassword);
		memberRepository.save(member);
	}
	
	public void remove(String id) {
		memberRepository.deleteById(id);
	}
	
	public void modify(Member member) {
		String id = "test";
		Optional<Member> findMember = memberRepository.findById(id);
		if(findMember.isPresent()) {
			member = findMember.get();
			// find 객체 수정후 save
			member.setName("test2");
			memberRepository.save(member);
		}
	}

	public List<Member> getList() {
		// TODO Auto-generated method stub
		return null;
	}
}
