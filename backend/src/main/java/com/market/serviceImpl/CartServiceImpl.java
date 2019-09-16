package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.CartRepository;
import com.market.service.CrudService;
import com.market.vo.Cart;

@Service
public class CartServiceImpl implements CrudService<Cart> {
	@Autowired
	CartRepository cartRepository;
	
	@Override
	public Cart getById(String id) {
		Cart findCart = cartRepository.findById(id).get();
		return findCart;
	}
	
	@Override
	public List<Cart> get(Cart cart) {
		Example<Cart> exampleCart = Example.of(cart);
		List<Cart> cartList = cartRepository.findAll(exampleCart);
		return cartList;
	}
	
	@Override
	public void save(Cart cart) {
		cartRepository.save(cart);
	}
	
	@Override
	public void remove(String id) {
		cartRepository.deleteById(id);
	}
	
	@Override
	public void modify(Cart cart) {
		String id = "1";
		Optional<Cart> findCart = cartRepository.findById(id);
		if(findCart.isPresent()) {
			cart = findCart.get();
			// find 객체 수정후 save
			cart.setIsUsing("Y");
			cartRepository.save(cart);
		}
	}

}
