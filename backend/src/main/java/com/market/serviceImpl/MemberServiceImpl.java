package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.MemberRepository;
import com.market.service.MemberService;
import com.market.util.HashUtil;
import com.market.vo.Member;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	MemberRepository memberRepository;
	
	@Override
	public Member getById(String id) {
		Member findMember = memberRepository.findById(id).get();
		return findMember;
	}
	
	@Override
	public List<Member> get(Member member) {
		Example<Member> exampleMember = Example.of(member);
		List<Member> memberList = memberRepository.findAll(exampleMember);
		return memberList;
	}
	
	@Override
	public void save(Member member) {
		String encryptPassword = HashUtil.passwordEncryptor(member.getPassword());
		member.setPassword(encryptPassword);
		memberRepository.save(member);
	}
	
	@Override
	public void remove(String id) {
		memberRepository.deleteById(id);
	}
	
	@Override
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
}
