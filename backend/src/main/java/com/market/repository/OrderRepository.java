package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Order;

public interface OrderRepository extends JpaRepository<Order, String> {

}
