package com.market.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	// 카테고리 추가 서비스
	@Transactional
	public void addCategory(Category category) {
		int categoryParents = category.getCategoryParents();
		
		// 상위 카테고리가 존재할 경우 상위 카테고리의 hasSubCategories 컬럼의 값을 Y로 설정
		if(categoryParents != 0) {
			Category mainCategory = categoryRepository.findById(categoryParents).orElse(null);
			mainCategory.setHasSubCategories("Y");
			
			categoryRepository.save(mainCategory);
		}
		
		categoryRepository.save(category);
	}
	
	// 카테고리 삭제 서비스
	@Transactional
	public void removeCategory(int id) {
		List<Category> categories = categoryRepository.findAllByCategoryParents(id);
		
		// 부모 카테고리일 경우
		if(categories != null) {
			categoryRepository.deleteAll(categories);
			categoryRepository.deleteById(id);
		} else {
			// 자식 카테고리가 없는 부모 카테고리가 될 경우 hasSubCategory 컬럼 수정
			Category category = categoryRepository.findById(id).orElse(null);
			
			if(category != null) {
				List<Category> subCategories = categoryRepository
						.findAllByCategoryParents(category.getCategoryParents());
				
				if(subCategories.size() == 0) {
					category.setHasSubCategories("N");
					categoryRepository.save(category);
				}
			}
		}
	}
	
	// 카테고리 조회 서비스
	public List<Category> getAllCategories(){
		List<Category> categoryList = categoryRepository.findAllByOrderByCreatedAtDesc();
		
		return categoryList;
	}
}
