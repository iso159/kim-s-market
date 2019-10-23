package com.market.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.market.constant.RoleType;
import com.market.repository.MemberRepository;
import com.market.util.HashUtil;
import com.market.vo.Member;
import com.market.vo.PageWrapper;
import com.market.vo.Pagination;

@Service
public class MemberService {

	@Autowired
	MemberRepository memberRepository;
	
	public Member getById(String id) {
		return memberRepository.findById(id).orElse(null);
	}
	
	public void save(Member member) {
		if(member.getAuthority() == null || member.getAuthority().trim() == "") {
			member.setAuthority(RoleType.DEFAULT_ROLE.getRoleUser());
		}
		
		String encryptPassword = HashUtil.passwordEncryptor(member.getPassword());
		member.setPassword(encryptPassword);
		memberRepository.save(member);
	}
	
	public void remove(String id) {
		memberRepository.deleteById(id);
	}
	
	public void banMember(Member member) {
		String id = member.getMemberId();
		Member resultMember = memberRepository.findById(id).orElse(null);
		if(resultMember != null) {
			resultMember.setStatus("B");
			memberRepository.save(resultMember);
		}
	}
	
	// 페이징에 관련된 정보와 실제 데이터를 포장하는 메서드
	public PageWrapper<Member> paginationMembers(int totalPages, long countAllMembers, List<Member> results) {
		PageWrapper<Member> pageWrapper = new PageWrapper<Member>();
		
		Pagination pagination = new Pagination();
		
		pagination.setPageCnt(totalPages);
		pagination.setListCnt(countAllMembers);
		
		pageWrapper.setPagination(pagination);
		pageWrapper.setResult(results);
		
		return pageWrapper;
	}
	
	// 상태 값에 따라 회원들을 조회하는 메서드
	public PageWrapper<Member> getMembers(Map<String, String> paramsMap) {
		PageWrapper<Member> pageWrapper = null;
		
		// 계정 상태 값 (Y: 정상, N: 승인 대기, B: 밴)
		String status = paramsMap.get("status");
		int currentPage = Integer.parseInt(paramsMap.get("currentPage"));
		int rowPerPage = Integer.parseInt(paramsMap.get("rowPerPage"));
		
		Pageable pageable = PageRequest.of(currentPage - 1, rowPerPage);
			
		// 상태 값에 따른 회원 조회
		List<Member> membersByStatus = memberRepository.findByStatus(status, pageable);
		long countMembersByStatus = memberRepository.countByStatus(status);
		
		int totalPages = (int) ((countMembersByStatus % rowPerPage) == 0 ? (countMembersByStatus / rowPerPage) : (countMembersByStatus / rowPerPage) + 1);
		
		pageWrapper = paginationMembers(totalPages, countMembersByStatus, membersByStatus);
		
		return pageWrapper;
	}
}
