package com.market.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.market.vo.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, String>{
	List<Item> findAllByCategoryNo(int categoryNo, Pageable pageable);
	
	@Query("SELECT i FROM Item i WHERE "
			+ "(:itemName1 is null OR i.itemName LIKE %:itemName1%) and "
			+ "(:itemName2 is null OR i.itemName LIKE %:itemName2%) and"
			+ "(:itemName3 is null OR i.itemName LIKE %:itemName3%)")
	List<Item> findAllByItemNameContainsAndItemNameContainsAndItemNameContains(@Param("itemName1") String itemName1, 
																			 @Param("itemName2") String itemName2, 
																			 @Param("itemName3") String itemName3, 
																			 Pageable pageable);
	
	List<Item> findAllByRegistrar(String registrar, Pageable pageable);
	
	long countByCategoryNo(int categoryNo);
	
	@Query("SELECT count(i) FROM Item i WHERE "
			+ "(:itemName1 is null OR i.itemName LIKE %:itemName1%) and"
			+ "(:itemName2 is null OR i.itemName LIKE %:itemName2%) and"
			+ "(:itemName3 is null OR i.itemName LIKE %:itemName3%)")
	long countByItemNameContainsAndItemNameContainsAndItemNameContains(@Param("itemName1") String itemName1, 
																	 @Param("itemName2") String itemName2, 
																	 @Param("itemName3") String itemName3);
	
	long countByRegistrar(String registrar);
	
}
