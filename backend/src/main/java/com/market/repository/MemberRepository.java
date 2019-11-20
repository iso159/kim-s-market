package com.market.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.market.vo.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
	
	//회원 전체 조회
	List<Member> findAll();
	
	// 회원 아이디, 계정상태 값 그리고 페이징에 따른 회원 목록 및 총 회원 수 조회
	List<Member> findByStatusAndMemberIdContainingIgnoreCaseOrderByCreatedAtDesc(String status, String memberId, Pageable pageable);
	int countByStatusAndMemberIdContainingIgnoreCase(String status, String memberId);
	
	// 회원 주소, 계정상태 값 그리고 페이징에 따른 회원 목록 조회
	List<Member> findByStatusAndAddressContainingIgnoreCaseOrderByCreatedAtDesc(String status, String address, Pageable pageable);
	int countByStatusAndAddressContainingIgnoreCase(String status, String address);
	
	// 회원 권한, 계정상태 값 그리고 페이징에 따른 회원 목록 조회
	List<Member> findByStatusAndAuthorityContainingIgnoreCaseOrderByCreatedAtDesc(String status, String authority, Pageable pageable);
	int countByStatusAndAuthorityContainingIgnoreCase(String status, String authority);
	
	// 회원 이름, 계정상태 값 그리고 페이징에 따른 회원 목록 조회
	List<Member> findByStatusAndNameContainingIgnoreCaseOrderByCreatedAtDesc(String status, String name, Pageable pageable);
	int countByStatusAndNameContainingIgnoreCase(String status, String name);
	
	// 회원 휴대폰 번호, 계정상태 값 그리고 페이징에 따른 회원 목록 조회
	List<Member> findByStatusAndPhoneContainingIgnoreCaseOrderByCreatedAtDesc(String status, String Phone, Pageable pageable);
	int countByStatusAndPhoneContainingIgnoreCase(String status, String Phone);
}
