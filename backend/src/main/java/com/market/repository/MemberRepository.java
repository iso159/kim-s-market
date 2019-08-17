package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.market.vo.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

}
