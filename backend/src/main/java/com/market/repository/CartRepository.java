package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Cart;

public interface CartRepository extends JpaRepository<Cart, String> {

}
