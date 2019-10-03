/**
 * Author : KJW
 */
package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
