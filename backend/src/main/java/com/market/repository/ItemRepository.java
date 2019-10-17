package com.market.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.market.vo.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, String>{
	List<Item> findAllByCategoryNo(int categoryNo, Pageable pageable);
	
	long countByCategoryNo(int categoryNo);
}
