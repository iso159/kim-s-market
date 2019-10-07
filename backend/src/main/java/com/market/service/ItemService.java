package com.market.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.market.repository.ItemRepository;
import com.market.vo.Item;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	FileService fileService;
	
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
