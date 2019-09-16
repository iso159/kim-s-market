package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Inquiry;

public interface InquiryRepository extends JpaRepository<Inquiry, String>{

}
