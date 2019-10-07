package com.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.CategoryService;
import com.market.vo.Category;

@RestController
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/categories")
	public List<Category> getCategoryList(){
		List<Category> allCategories = categoryService.getAllCategories();
		
		return allCategories;
	}
}
