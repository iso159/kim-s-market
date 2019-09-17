package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.CategoryRepository;
import com.market.service.CrudService;
import com.market.vo.Category;

@Service
public class CategoryServiceImpl implements CrudService<Category> {

	@Autowired
	CategoryRepository categoryRepository;
	
	@Override
	public Category getById(String id) {
		Category findCategory = categoryRepository.findById(id).get();
		return findCategory;
	}
	
	@Override
	public List<Category> get(Category category) {
		Example<Category> exampleCategory = Example.of(category);
		List<Category> categoryList = categoryRepository.findAll(exampleCategory);
		return categoryList;
	}
	
	@Override
	public void save(Category category) {
		categoryRepository.save(category);
	}
	
	@Override
	public void remove(String id) {
		categoryRepository.deleteById(id);
	}
	
	@Override
	public void modify(Category category) {
		String id = "1";
		Optional<Category> findCategory = categoryRepository.findById(id);
		if(findCategory.isPresent()) {
			category = findCategory.get();
			// find 객체 수정후 save
			category.setCategoryName("카테고리명");
			categoryRepository.save(category);
		}
	}
}
