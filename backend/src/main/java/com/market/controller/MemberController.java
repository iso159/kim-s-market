package com.market.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.MemberService;
import com.market.vo.Member;
import com.market.vo.PageWrapper;

@RestController
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("/member/join")
	public void create(@RequestBody PageWrapper<Member> request) {
		Member member = request.getRequestData();
		memberService.save(member);
	}
	
	@PutMapping("/members/ban")
	public ResponseEntity<String> banMembers(@RequestBody Member member) {
		memberService.banMember(member);
		
		return new ResponseEntity<String>("Successfully Banned !",HttpStatus.OK);
	}
	
	// 전체 회원목록 조회
	@GetMapping("/members")
	public ResponseEntity<PageWrapper<Member>> getAllMembers(@RequestParam Map<String, String> paramsMap) {
		System.out.println(paramsMap);
		
		PageWrapper<Member> pageWrapper = memberService.getMembers(paramsMap);
		
		return new ResponseEntity<PageWrapper<Member>>(pageWrapper, HttpStatus.OK);
	}
}
