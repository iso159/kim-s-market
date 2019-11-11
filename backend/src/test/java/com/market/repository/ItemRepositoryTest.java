package com.market.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.market.service.CategoryService;
import com.market.service.MemberService;
import com.market.vo.Category;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemRepositoryTest {
	
	@Autowired
	ItemRepository ir;
	
	@Test
	public void joinQueryTest() {
		System.out.println(ir.testJoinQuery());
		System.out.println(ir.findById(24));
	}
}
