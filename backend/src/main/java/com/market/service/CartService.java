package com.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.repository.CartRepository;
import com.market.vo.Cart;

@Service
public class CartService {

	@Autowired
	CartRepository cartRepository;
	
	public void save(Cart cart) {
		cartRepository.save(cart);
	}
}
