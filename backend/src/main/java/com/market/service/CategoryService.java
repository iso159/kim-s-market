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
	private CategoryRepository categoryRepository;
	
	public Category getById(int id) {
		Category findCategory = categoryRepository.findById(id).orElse(null);
		return findCategory;
	}
	
	public Category save(Category category) {
		return categoryRepository.save(category);
	}
	
	public void removeById(int id) {
		categoryRepository.deleteById(id);
	}
	
	public void modify(Category category) {
	}
	
	public List<Category> getAllCategories(){
		List<Category> categoryList = categoryRepository.findAllByOrderByCreatedAtDesc();
		
		return categoryList;
	}
}
