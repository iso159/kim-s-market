/**
 * Author : KJW
 */
package com.market.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	public List<Category> findAllByOrderByCreatedAtDesc();
}
