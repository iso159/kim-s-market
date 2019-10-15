package com.market.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.market.repository.ItemRepository;
import com.market.vo.ResponseEntity;
import com.market.vo.Item;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	FileService fileService;
	
	public ResponseEntity<Item> getByCategoryNo(int categoryNo, int startPage, int pageSize) {
		List<Item> itemList = null;
		Pageable pageable = PageRequest.of(startPage -1, pageSize);
		itemList = itemRepository.findAllByCategoryNo(categoryNo, pageable);
		long count = itemRepository.count();
		
		ResponseEntity<Item> item = new ResponseEntity<Item>();
		item.setResult(itemList);
		item.setCount(count);
		
		return item;
	}
	
	@Transactional
	public void save(Item item, MultipartFile file) {
		String changeFileName = null;
		String imagePath = null;
		
		if(file != null && !file.isEmpty()) {
			changeFileName = UUID.randomUUID().toString();
			imagePath = fileService.storeFile(file, changeFileName);
			item.setImagePath(imagePath);
		}
		
		itemRepository.save(item);
	}
	
}
