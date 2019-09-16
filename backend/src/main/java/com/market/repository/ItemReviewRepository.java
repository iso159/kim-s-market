package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.ItemReview;

public interface ItemReviewRepository extends JpaRepository<ItemReview, String> {

}
