package com.market.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.market.vo.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
	// 상태 값이 null이 아닌 모든 회원 조회
	List<Member> findByStatusIsNotNull(Pageable pageable);
	
	// 상태 값이 null이 아닌 모든 회원 수 카운트
	Long countByStatusIsNotNull();
	
	// 상태 값에 따른 회원 조회
	List<Member> findByStatus(String status, Pageable pageable);
	
	// 상태 값에 따른 회원 수 카운트
	Long countByStatus(String status);
}
