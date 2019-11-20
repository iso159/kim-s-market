package com.market.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.market.repository.MemberRepository;
import com.market.service.BanService;
import com.market.service.MemberService;
import com.market.vo.Ban;
import com.market.vo.Member;
import com.market.vo.PageWrapper;

@RestController
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	BanService banService;
	
	@PostMapping("/member/join")
	public void create(@RequestBody PageWrapper<Member> request) {
		Member member = request.getRequestData();
		memberService.save(member);
	}
	
	// 회원 가입신청 승인
	@PutMapping("/members/approve/{memberId}")
	public ResponseEntity<String> approveMember(@RequestBody Member member, @PathVariable String memberId) {
		memberService.approveMember(member);
		
		return new ResponseEntity<String>("Successfully approved !", HttpStatus.OK);
	}
	
	// 회원 밴 해제
	@PutMapping("/members/cancel-banned/{memberId}")
	public ResponseEntity<String> cancelBannedMember(@RequestBody Member member, @PathVariable String memberId) {
		memberService.cancelBannedMember(member);
		
		return new ResponseEntity<String>("Successfully Cancel Banned Member !", HttpStatus.OK);
	}
	
	// 회원 밴
	@Transactional
	@PutMapping("/members/ban/{memberId}")
	public ResponseEntity<String> banMember(@RequestBody Member member) {
		
		memberService.banMember(member);
		
		return new ResponseEntity<String>("Successfully Banned !", HttpStatus.OK);
	}
	
	//회원 전체 조회
	@GetMapping("/membersId")
	public List<Member> getMember(){
		List<Member> getAllMember = memberService.getAllMember();
		return getAllMember;
	}
	
	// 회원 조회
	@GetMapping("/members")
	public ResponseEntity<?> getMembers(@RequestParam Map<String, String> paramsMap) {
		System.out.println(paramsMap);
		
		int currentPage = 0;
		int rowPerPage = 0;
		
		String status = paramsMap.get("status");
		String currentPageStr = paramsMap.get("currentPage");
		String rowPerPageStr = paramsMap.get("rowPerPage");
		String searchKey = paramsMap.get("searchKey");
		String searchValue = paramsMap.get("searchValue");
		
		// 필수 파라미터 체크
		if(status == null || currentPageStr == null || rowPerPageStr == null) {
			return new ResponseEntity<String>("필수 매개변수를 전달받지 못했습니다.", HttpStatus.BAD_REQUEST);
		}
		
		// status 유효성 체크
		if(!(status.equals("Y") || status.equals("N") || status.equals("B"))) {
			return new ResponseEntity<String>("status 매개변수의 값이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
		}
		
		// 페이징 관련 NaN 체크
		try {
			currentPage = Integer.parseInt(currentPageStr);
			rowPerPage = Integer.parseInt(rowPerPageStr);
		} catch(NumberFormatException e) {
			return new ResponseEntity<String>("페이징 관련 매개변수의 값이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
		}
		
		Map<String, Object> conditions = new HashMap<>();
		conditions.put("status", status);
		conditions.put("currentPage", currentPage);
		conditions.put("rowPerPage", rowPerPage);
		conditions.put("searchKey", searchKey);
		conditions.put("searchValue", searchValue);
		
		// 전달받은 조건 객체에 맞는 회원 목록 조회
		PageWrapper<Member> pageWrapper = memberService.getMembers(conditions);
		
		return new ResponseEntity<PageWrapper<Member>>(pageWrapper, HttpStatus.OK);
	}
}
