package com.market.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Cart;

public interface CartRepository extends JpaRepository<Cart, String> {
	public Cart findByMemberIdAndItemNoAndIsUsing(String memberId, int itemNo, String isUsing);
	
	public List<Cart> findAllByMemberIdAndIsUsing(String memberId, String isUsing);
}
