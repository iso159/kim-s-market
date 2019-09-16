package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.ItemReviewRepository;
import com.market.service.CrudService;
import com.market.vo.ItemReview;

@Service
public class ItemReviewServiceImpl implements CrudService<ItemReview> {

	@Autowired
	ItemReviewRepository itemReviewRepository;
	
	@Override
	public ItemReview getById(String id) {
		ItemReview findItemReview = itemReviewRepository.findById(id).get();
		return findItemReview;
	}
	
	@Override
	public List<ItemReview> get(ItemReview itemReview) {
		Example<ItemReview> exampleItemReview = Example.of(itemReview);
		List<ItemReview> itemReviewList = itemReviewRepository.findAll(exampleItemReview);
		return itemReviewList;
	}
	
	@Override
	public void save(ItemReview itemReview) {
		itemReviewRepository.save(itemReview);
	}
	
	@Override
	public void remove(String id) {
		itemReviewRepository.deleteById(id);
	}
	
	@Override
	public void modify(ItemReview itemReview) {
		String id = "1";
		Optional<ItemReview> findItemReview = itemReviewRepository.findById(id);
		if(findItemReview.isPresent()) {
			itemReview = findItemReview.get();
			// find 객체 수정후 save
			itemReview.setContent("수정 내용");
			itemReviewRepository.save(itemReview);
		}
	}
}
