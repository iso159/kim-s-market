package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Item;

public interface ItemRepository extends JpaRepository<Item, String>{

}
