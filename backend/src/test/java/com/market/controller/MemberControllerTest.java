package com.market.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.market.vo.Ban;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MemberControllerTest {
	
	@Autowired
	MemberController memberController;
	
	@Test
	public void banMemberTransactionTest() {
		Ban ban = new Ban();
		String memberId = "seller";
	}
}
