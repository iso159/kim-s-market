package com.market.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.market.repository.ItemRepository;
import com.market.vo.Item;
import com.market.vo.Pagination;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	FileService fileService;
	
	public List<Item> getByCategoryNo(int categoryNo, int startPage, int pageSize) {
		List<Item> itemList = null;
		Pageable pageable = PageRequest.of(startPage -1, pageSize);
		itemList = itemRepository.findAllByCategoryNo(categoryNo, pageable);
		
		return itemList;
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
	
	public Page<Item> search(Item item, Pagination pagination) {
		Pageable pageable = PageRequest.of(pagination.getCurPage() - 1, pagination.getPageSize());
		Example<Item> example = Example.of(item);
		Page<Item> itemList = itemRepository.findAll(example, pageable);
		return itemList;
	}
	
	public long getTotalCount() {
		long count = itemRepository.count();
		return count;
	}
	
}
