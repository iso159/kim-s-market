package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.ItemAnswerRepository;
import com.market.service.CrudService;

import com.market.vo.ItemAnswer;

@Service
public class ItemAnswerServiceImpl implements CrudService<ItemAnswer> {
	
	@Autowired
	ItemAnswerRepository itemAnswerRepository;
	
	@Override
	public ItemAnswer getById(String id) {
		ItemAnswer findItemAnswer = itemAnswerRepository.findById(id).get();
		return findItemAnswer;
	}
	
	@Override
	public List<ItemAnswer> get(ItemAnswer itemAnswer) {
		Example<ItemAnswer> exampleItemAnswer = Example.of(itemAnswer);
		List<ItemAnswer> itemAnswerList = itemAnswerRepository.findAll(exampleItemAnswer);
		return itemAnswerList;
	}
	
	@Override
	public void save(ItemAnswer itemAnswer) {
		itemAnswerRepository.save(itemAnswer);
	}
	
	@Override
	public void remove(String id) {
		itemAnswerRepository.deleteById(id);
	}
	
	@Override
	public void modify(ItemAnswer itemAnswer) {
		String id = "1";
		Optional<ItemAnswer> findItemAnswer = itemAnswerRepository.findById(id);
		if(findItemAnswer.isPresent()) {
			itemAnswer = findItemAnswer.get();
			// find 객체 수정후 save
			itemAnswer.setContent("수정 내용");
			itemAnswerRepository.save(itemAnswer);
		}
	}
}
