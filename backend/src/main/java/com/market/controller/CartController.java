package com.market.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.CartService;
import com.market.vo.Cart;
import com.market.vo.PageWrapper;

@RestController
public class CartController {

	@Autowired
	CartService cartService;
	
	@PostMapping("/carts")
	public void create(@RequestBody PageWrapper<Cart> pageWrapper) {
		Cart cart = pageWrapper.getRequestData();
		cartService.save(cart);
	}
}
