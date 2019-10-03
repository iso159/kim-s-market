package com.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.MemberService;
import com.market.vo.GenericObject;
import com.market.vo.Member;

@RestController
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("/member/join")
	public void create(@RequestBody GenericObject<Member> request) {
		Member member = request.getRequestData();
		memberService.save(member);
	}
}
