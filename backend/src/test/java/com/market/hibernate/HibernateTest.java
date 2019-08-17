package com.market.hibernate;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.market.repository.MemberRepository;
import com.market.vo.Member;

@SpringBootTest
@RunWith(SpringRunner.class)
public class HibernateTest {
	
	@Autowired
	Member member;
	
	@Autowired
	MemberRepository memberRepository;
	
	
	@Test
	public void hibernateInsertTest() {
		String memberId = "test";
		String address = "서울";
		String name = "입력테스트";
		String mail = "test@testmail.com";
		String password = "test1234";
		String phone = "01012345678";
		String zipCode = "57894";
		char authority = 'U';
		char status = 'T';
				
		member.setMemberId(memberId);
		member.setName(name);
		member.setMail(mail);
		member.setPassword(password);
		member.setPhone(phone);
		member.setZipCode(zipCode);
		member.setAuthority(authority);
		member.setStatus(status);
		member.setAddress(address);
		
		memberRepository.save(member);
	}
	
	@Test
	public void hibernateSelectTest() {
		String id = "test";
		Optional<Member> findMember = memberRepository.findById(id);
		if(findMember.isPresent()) {
			member = findMember.get();
			System.out.println(member);
		} else {
			System.out.println("Select Fail");
		}
	}
	
	@Test
	public void hibernateUpdateTest() {
		String id = "test";
		Optional<Member> findMember = memberRepository.findById(id);
		if(findMember.isPresent()) {
			member = findMember.get();
			// find 객체 수정후 save
			member.setName("test2");
			memberRepository.save(member);
		} else {
			System.out.println("Select Fail");
		}
	}
	
	@Test
	public void hibernateDelete() {
		String id = "test";
		memberRepository.deleteById(id);
	}
}
