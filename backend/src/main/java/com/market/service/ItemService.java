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
import com.market.vo.Item;
import com.market.vo.Pagination;

@Service
public class ItemService {
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	FileService fileService;
	
	public List<Item> getByCategoryNo(int categoryNo, Pagination pagination) {
		Pageable pageable = PageRequest.of(pagination.getCurPage() -1, pagination.getPageSize());
		List<Item> itemList = itemRepository.findAllByCategoryNo(categoryNo, pageable);
		
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
	
	public List<Item> search(String keyWord, Pagination pagination) {
		String keyWord1 = "";
		String keyWord2 = "";
		String keyWord3 = "";
		
		if(keyWord != null && keyWord.trim() != "") {
			// 중복된 공백 제거 및 단어 분할
			String[] keyWordArray = keyWord.replaceAll("\\s+", " ").split("\\s");
			int wordArrayNum = 0;
			
			for(String word : keyWordArray ) {
				if(wordArrayNum == 0) {
					keyWord1 = "%" + word + "%";
				} else if(wordArrayNum == 1) {
					keyWord2 = "%" + word + "%";
				} else if(wordArrayNum == 2) {
					keyWord3 = "%" + word + "%";
				}
			}
		}
		
		Pageable pageable = PageRequest.of(pagination.getCurPage() - 1, pagination.getPageSize());
		List<Item> itemList = itemRepository.findAllByItemNameContainsOrItemNameContainsOrItemNameContains(keyWord1, 
								keyWord2, keyWord3, pageable);
		return itemList;
	}
	
	public long getCount(int categoryNo) {
		long count = itemRepository.countByCategoryNo(categoryNo);
		return count;
	}
	
	public long getSearchCountByItemName(String keyWord) {
		String keyWord1 = "";
		String keyWord2 = "";
		String keyWord3 = "";
		
		if(keyWord != null && keyWord.trim() != "") {
			String[] keyWordArray = keyWord.split("\\s");
			int wordArrayNum = 0;
			
			for(String word : keyWordArray ) {
				if(wordArrayNum == 0) {
					keyWord1 = "%" + word + "%";
				} else if(wordArrayNum == 1) {
					keyWord2 = "%" + word + "%";
				} else if(wordArrayNum == 2) {
					keyWord3 = "%" + word + "%";
				}
			}
		}
		
		long count = itemRepository.countByItemNameContainsOrItemNameContainsOrItemNameContains(keyWord1, keyWord2, keyWord3);
		return count;
	}
	
}
