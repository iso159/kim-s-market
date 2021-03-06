package com.market.hibernate;

import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.market.repository.ItemRepository;
import com.market.repository.MemberRepository;
import com.market.util.HashUtil;
import com.market.vo.Category;
import com.market.vo.Item;
import com.market.vo.Member;

@SpringBootTest
@RunWith(SpringRunner.class)
public class HibernateTest {
	
	@Autowired
	Member member;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	ItemRepository itemRepository;
	
	
	@Test
	public void hibernateInsertTest() {
		String memberId = "admin";
		String address = "서울 강남구 언주로";
		String name = "판매자";
		String mail = "seller@seller.com";
		String password = "1111";
		String phone = "01077491123";
		String zipCode = "57894";
		String authority = "ADMIN";
				
		member.setMemberId(memberId);
		member.setName(name);
		member.setMail(mail);
		member.setPassword(HashUtil.passwordEncryptor(password));
		member.setPhone(phone);
		member.setZipCode(zipCode);
		member.setAddress(address);
		member.setAuthority(authority);
		
		memberRepository.save(member);
		
		member.setMemberId("seller");
		member.setAuthority("SELLER");
		memberRepository.save(member);
		
		member.setMemberId("user");
		member.setAuthority("USER");
		memberRepository.save(member);
	}
	
	@Test
	public void hibernateSelectByIdTest() {
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
	public void hibernateSelectTest() {
		String address = "서울";
		member.setAddress(address);
		Example<Member> example = Example.of(member);
		List<Member> findMember = memberRepository.findAll(example);
		if(!findMember.isEmpty()) {
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
	
	@Test
	@Transactional
	public void hibernateJoinQuery() {
		Category category = new Category();
		category.setCategoryNo(95);
		List<Item> item = itemRepository.findAllByCategory_categoryNo(95);
		for( Item i : item) {
			System.out.println(i.getCategory());
		}
	}
}
