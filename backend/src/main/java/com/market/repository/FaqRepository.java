package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Faq;

public interface FaqRepository extends JpaRepository<Faq, String> {

}
