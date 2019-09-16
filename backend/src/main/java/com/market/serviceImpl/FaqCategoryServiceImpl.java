package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.FaqCategoryRepository;
import com.market.service.CrudService;
import com.market.vo.FaqCategory;

@Service
public class FaqCategoryServiceImpl implements CrudService<FaqCategory> {
	
	@Autowired
	FaqCategoryRepository faqCategoryRepository;
	
	@Override
	public FaqCategory getById(String id) {
		FaqCategory findFaqCategory = faqCategoryRepository.findById(id).get();
		return findFaqCategory;
	}
	
	@Override
	public List<FaqCategory> get(FaqCategory faqCategory) {
		Example<FaqCategory> exampleFaqCategory = Example.of(faqCategory);
		List<FaqCategory> faqCategoryList = faqCategoryRepository.findAll(exampleFaqCategory);
		return faqCategoryList;
	}
	
	@Override
	public void save(FaqCategory faqCategory) {
		faqCategoryRepository.save(faqCategory);
	}
	
	@Override
	public void remove(String id) {
		faqCategoryRepository.deleteById(id);
	}
	
	@Override
	public void modify(FaqCategory faqCategory) {
		String id = "1";
		Optional<FaqCategory> findFaqCategory = faqCategoryRepository.findById(id);
		if(findFaqCategory.isPresent()) {
			faqCategory = findFaqCategory.get();
			// find 객체 수정후 save
			faqCategory.setFaqCategoryName("FAQ 카테고리 명");
			faqCategoryRepository.save(faqCategory);
		}
	}
}
