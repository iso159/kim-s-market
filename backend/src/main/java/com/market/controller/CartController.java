package com.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.CartService;
import com.market.vo.Cart;
import com.market.vo.PageWrapper;

@RestController
public class CartController {

	@Autowired
	CartService cartService;
	
	@GetMapping("/carts/{memberId}")
	public ResponseEntity<PageWrapper<Cart>> getCarts(@PathVariable String memberId) {
		PageWrapper<Cart> response = new PageWrapper<Cart>();
		List<Cart> cartList = cartService.getByMemberId(memberId);
		response.setResult(cartList);
		return new ResponseEntity<PageWrapper<Cart>>(response, HttpStatus.OK);		
	}
	
	@PutMapping("/carts")
	public void create(@RequestBody PageWrapper<Cart> pageWrapper) {
		Cart cart = pageWrapper.getRequestData();
		cartService.save(cart);
	}
}
