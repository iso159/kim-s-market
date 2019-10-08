package com.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.market.service.CategoryService;
import com.market.vo.Category;

@RestController
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	// 카테고리 전체 목록 조회
	@GetMapping("/categories")
	public List<Category> getCategoryList(){
		List<Category> allCategories = categoryService.getAllCategories();
		
		return allCategories;
	}
	
	// 카테고리 추가
	@PostMapping("/categories")
	public Category addCategory(@RequestBody Category category) {
		System.out.println(category);
		return categoryService.save(category);
	}
	
	// 카테고리 삭제
	@DeleteMapping("/categories/{id}")
	public void removeCategory(@PathVariable int id) {
		categoryService.removeById(id);
	}
}
