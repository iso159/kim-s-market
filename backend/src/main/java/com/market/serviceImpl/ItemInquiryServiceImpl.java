package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.ItemInquiryRepository;
import com.market.service.CrudService;
import com.market.vo.ItemInquiry;

@Service
public class ItemInquiryServiceImpl implements CrudService<ItemInquiry> {

	@Autowired
	ItemInquiryRepository itemInquiryRepository;
	
	@Override
	public ItemInquiry getById(String id) {
		ItemInquiry findItemInquiry = itemInquiryRepository.findById(id).get();
		return findItemInquiry;
	}
	
	@Override
	public List<ItemInquiry> get(ItemInquiry itemInquiry) {
		Example<ItemInquiry> exampleItemInquiry = Example.of(itemInquiry);
		List<ItemInquiry> itemInquiryList = itemInquiryRepository.findAll(exampleItemInquiry);
		return itemInquiryList;
	}
	
	@Override
	public void save(ItemInquiry itemInquiry) {
		itemInquiryRepository.save(itemInquiry);
	}
	
	@Override
	public void remove(String id) {
		itemInquiryRepository.deleteById(id);
	}
	
	@Override
	public void modify(ItemInquiry itemInquiry) {
		String id = "1";
		Optional<ItemInquiry> findItemInquiry = itemInquiryRepository.findById(id);
		if(findItemInquiry.isPresent()) {
			itemInquiry = findItemInquiry.get();
			// find 객체 수정후 save
			itemInquiry.setContent("수정 내용");
			itemInquiryRepository.save(itemInquiry);
		}
	}
}
