package com.market.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.market.util.HashUtil;
import com.market.vo.Member;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MemberRepositoryTest {
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Test
	public void initDefaultMember() {
		Member admin = new Member();
		admin.setMemberId("admin");
		admin.setPassword(HashUtil.passwordEncryptor("1111"));
		admin.setAddress("강남구 언주로");
		admin.setAuthority("ADMIN");
		admin.setMail("handsomekey1123@gmail.com");
		admin.setName("관리자");
		admin.setPhone("01077491123");
		admin.setZipCode("06147");
		
		Member seller = new Member();
		seller.setMemberId("seller");
		seller.setPassword(HashUtil.passwordEncryptor("1111"));
		seller.setAddress("강남구 언주로");
		seller.setAuthority("SELLER");
		seller.setMail("handsomekey1123@gmail.com");
		seller.setName("판매자");
		seller.setPhone("01077491123");
		seller.setZipCode("06147");
		
		Member user = new Member();
		user.setMemberId("user");
		user.setPassword(HashUtil.passwordEncryptor("1111"));
		user.setAddress("강남구 언주로");
		user.setAuthority("USER");
		user.setMail("handsomekey1123@gmail.com");
		user.setName("일반사용자");
		user.setPhone("01077491123");
		user.setZipCode("06147");
		
		memberRepository.save(admin);
		memberRepository.save(seller);
		memberRepository.save(user);
		
		Optional<Member> expectedAdmin = memberRepository.findById("admin");
		Optional<Member> expectedSeller = memberRepository.findById("seller");
		Optional<Member> expectedUser = memberRepository.findById("user");
		
		assertThat(expectedAdmin.get().getAuthority()).isEqualTo("ADMIN");
		assertThat(expectedSeller.get().getAuthority()).isEqualTo("SELLER");
		assertThat(expectedUser.get().getAuthority()).isEqualTo("USER");
	}
}
