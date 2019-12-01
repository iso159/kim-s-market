package com.market.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.constant.CommonType;
import com.market.repository.CartRepository;
import com.market.vo.Cart;

@Service
public class CartService {

	@Autowired
	CartRepository cartRepository;
	
	public void save(Cart cart) {
		Cart cartFromDB = cartRepository.findByMemberIdAndItemNoAndIsUsing(
								cart.getMemberId(), cart.getItemNo(), CommonType.DFAULT_TYPE.getN());
		
		if(cartFromDB == null) {
			cartRepository.save(cart);
		} else {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date(System.currentTimeMillis());
			
			cartFromDB.setCount(cart.getCount());
			cartFromDB.setUpdatedAt(dateFormat.format(date));
			
			cartRepository.save(cartFromDB);
		}
	}
	
	public List<Cart> getByMemberId(String memberId) {
		List<Cart> cartList = cartRepository.findAllByMemberIdAndIsUsing(memberId, CommonType.DFAULT_TYPE.getN());
		return cartList;
	}
}
