/**
 * Author : KJW
 */
package com.market.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.market.vo.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	@Query(value = "SELECT * FROM tb_category WHERE CATEGORY_PARENTS = ?1", nativeQuery = true)
    List<Category> findTopCategories(int categoryParents);
}
