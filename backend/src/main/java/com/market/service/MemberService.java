package com.market.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	// 회원 가입신청 승인 메서드
	public void approveMember(Member member) {
		String id = member.getMemberId();
		Member resultMember = memberRepository.findById(id).orElse(null);
		
		if(resultMember != null) {
			resultMember.setStatus("Y");
			memberRepository.save(resultMember);
		}
	}
	
	// 회원 밴 메서드
	public void banMember(Member member) {
		String id = member.getMemberId();
		Member resultMember = memberRepository.findById(id).orElse(null);
		
		if(resultMember != null) {
			resultMember.setStatus("B");
			memberRepository.save(resultMember);
		}
	}
	
	// 검색조건, 페이징에 따라 회원 리스트를 조회하는 메서드
	public PageWrapper<Member> getMembers(Map<String, Object> conditions) {
		int memberCount;
		List<Member> memberList;
		
		String status = (String) conditions.get("status");
		int currentPage = (int) conditions.get("currentPage");
		int rowPerPage = (int) conditions.get("rowPerPage");
		String searchKey = (String) conditions.get("searchKey");
		String searchValue = conditions.get("searchValue") != null ? (String) conditions.get("searchValue") : "";
		
		Pageable pageable = PageRequest.of(currentPage - 1, rowPerPage);
		
		// 검색 조건 별 회원 조회 분기
		if(searchKey == null) {
			// 계정 상태 별
			memberList = memberRepository.findByStatus(status, pageable);
			memberCount = memberRepository.countByStatus(status);
		} else if(searchKey.equals("memberId")) {
			// 회원 아이디, 계정 상태 별
			memberList = memberRepository.findByStatusAndMemberIdContainingIgnoreCase(status, searchValue, pageable);
			memberCount = memberRepository.countByStatusAndMemberIdContainingIgnoreCase(status, searchValue);
		} else if(searchKey.equals("address")) {
			// 회원 주소, 계정 상태 별
			memberList = memberRepository.findByStatusAndAddressContainingIgnoreCase(status, searchValue, pageable);
			memberCount = memberRepository.countByStatusAndAddressContainingIgnoreCase(status, searchValue);
		} else if(searchKey.equals("authority")) {
			// 회원 권한, 계정 상태 별
			memberList = memberRepository.findByStatusAndAuthorityContainingIgnoreCase(status, searchValue, pageable);
			memberCount = memberRepository.countByStatusAndAuthorityContainingIgnoreCase(status, searchValue);
		} else if(searchKey.equals("name")) {
			// 회원 이름, 계정 상태 별
			memberList = memberRepository.findByStatusAndNameContainingIgnoreCase(status, searchValue, pageable);
			memberCount = memberRepository.countByStatusAndNameContainingIgnoreCase(status, searchValue);
		} else {
			// 회원 휴대폰 번호, 계정 상태 별
			memberList = memberRepository.findByStatusAndPhoneContainingIgnoreCase(status, searchValue, pageable);
			memberCount = memberRepository.countByStatusAndPhoneContainingIgnoreCase(status, searchValue);
		}
		
		int totalPages = memberCount / rowPerPage;
		if((memberCount % rowPerPage) != 0) totalPages += 1;
		
		PageWrapper<Member> pageWrapper = new PageWrapper<>();
		
		Pagination pagination = new Pagination();
		pagination.setPageCnt(totalPages);
		pagination.setListCnt(memberCount);
		pagination.setCurPage(currentPage);
		pagination.setPageSize(rowPerPage);
		
		pageWrapper.setPagination(pagination);
		pageWrapper.setResult(memberList);

		return pageWrapper;
	}
}
