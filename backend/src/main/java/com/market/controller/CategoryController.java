package com.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.CategoryService;
import com.market.vo.Category;

@RestController
public class CategoryController {
	
	private CategoryService categoryService;
	
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@GetMapping("/category/all")
	public List<Category> getCategoryList(){
		List<Category> allCategories = categoryService.getAllCategories();
		
		return allCategories;
	}
}
