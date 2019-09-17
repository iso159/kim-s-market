package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.market.vo.Answer;
@Repository
public interface AnswerRepository extends JpaRepository<Answer, String>{
	
}
