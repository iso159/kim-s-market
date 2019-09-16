package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.OrderRepository;
import com.market.service.CrudService;
import com.market.vo.Order;

@Service
public class OrderServiceImpl implements CrudService<Order> {

	@Autowired
	OrderRepository orderRepository;
	
	@Override
	public Order getById(String id) {
		Order findOrder = orderRepository.findById(id).get();
		return findOrder;
	}
	
	@Override
	public List<Order> get(Order order) {
		Example<Order> exampleOrder = Example.of(order);
		List<Order> orderList = orderRepository.findAll(exampleOrder);
		return orderList;
	}
	
	@Override
	public void save(Order order) {
		orderRepository.save(order);
	}
	
	@Override
	public void remove(String id) {
		orderRepository.deleteById(id);
	}
	
	@Override
	public void modify(Order order) {
		String id = "1";
		Optional<Order> findOrder = orderRepository.findById(id);
		if(findOrder.isPresent()) {
			order = findOrder.get();
			// find 객체 수정후 save
			order.setOrderStatus("주문 상태");
			orderRepository.save(order);
		}
	}
}
