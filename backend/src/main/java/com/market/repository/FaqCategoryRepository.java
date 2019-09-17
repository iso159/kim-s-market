package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.FaqCategory;

public interface FaqCategoryRepository extends JpaRepository<FaqCategory, String> {

}
