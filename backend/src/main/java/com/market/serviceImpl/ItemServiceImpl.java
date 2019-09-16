package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.ItemRepository;
import com.market.service.CrudService;
import com.market.vo.Item;

@Service
public class ItemServiceImpl implements CrudService<Item> {
	@Autowired
	ItemRepository itemRepository;
	
	@Override
	public Item getById(String id) {
		Item findItem = itemRepository.findById(id).get();
		return findItem;
	}
	
	@Override
	public List<Item> get(Item item) {
		Example<Item> exampleItem = Example.of(item);
		List<Item> itemList = itemRepository.findAll(exampleItem);
		return itemList;
	}
	
	@Override
	public void save(Item item) {
		itemRepository.save(item);
	}
	
	@Override
	public void remove(String id) {
		itemRepository.deleteById(id);
	}
	
	@Override
	public void modify(Item item) {
		String id = "1";
		Optional<Item> findItem = itemRepository.findById(id);
		if(findItem.isPresent()) {
			item = findItem.get();
			// find 객체 수정후 save
			item.setItemInformation("상품정보");
			itemRepository.save(item);
		}
	}
	
}
