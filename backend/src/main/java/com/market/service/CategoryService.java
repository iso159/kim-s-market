/**
 * Author : KJW
 **/
package com.market.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.repository.CategoryRepository;
import com.market.vo.Category;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public Category getById(int id) {
		Category findCategory = categoryRepository.findById(id).orElse(null);
		return findCategory;
	}
	
	public void save(Category category) {
		categoryRepository.save(category);
	}
	
	public void remove(int id) {
	}
	
	public void modify(Category category) {
	}
	
	public List<Category> getAllCategory(){
		List<Category> categoryList = categoryRepository.findAll();
		
		return categoryList;
	}
	
	public List<Category> getTopCategory(){
		return categoryRepository.findTopCategories(0);
	}
}
