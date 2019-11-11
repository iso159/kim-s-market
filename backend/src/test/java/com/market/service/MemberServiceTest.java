package com.market.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.market.repository.MemberRepository;
import com.market.vo.Member;
import com.market.vo.PageWrapper;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MemberServiceTest {
	
	@Autowired
	MemberRepository mr;
	
	@Autowired
	MemberService ms;
	
	@Test
	public void getMembers() {
		System.out.println(mr.findById("test3"));
	}
	
	@Test
	public void getMembersTest() {
		Map<String, Object> conditions = new HashMap<>();
		conditions.put("status", "B");
		conditions.put("currentPage", 1);
		conditions.put("rowPerPage", 5);
		conditions.put("searchKey", "memberId");
		conditions.put("searchValue", "");
		
		PageWrapper<Member> result = ms.getMembers(conditions);
		List<Member> resultMember = result.getResult();
		
	}
}
