package com.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.market.vo.Member;
import com.market.service.MemberService;
import com.market.vo.GenericObject;

@RestController
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@RequestMapping(value = "/member/join", method = RequestMethod.POST)
	public void create(@RequestBody GenericObject<Member> request) {
		Member member = request.getRequestData();
		memberService.save(member);
	}
}
