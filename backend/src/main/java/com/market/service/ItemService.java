package com.market.service;

import java.sql.Date;
import java.text.SimpleDateFormat;
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
		List<Item> itemList = itemRepository.findAllByCategoryNoAndIsCanceled(categoryNo, "N", pageable);
		
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
	
	@Transactional
	public void update(Item item, MultipartFile file) {
		Item itemFromDb = itemRepository.findById(item.getItemNo()).orElse(null);
		
		if(itemFromDb != null && item != null) {			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date(System.currentTimeMillis());
			
			if(item.getIsCanceled() != null) {
				itemFromDb.setIsCanceled(item.getIsCanceled());
				
				if(item.getIsCanceled().equals("Y")) {
					itemFromDb.setDeletedAt(dateFormat.format(date));
					itemFromDb.setItemDeletor(item.getItemDeletor());
				} else {
					itemFromDb.setUpdatedAt(dateFormat.format(date));
					itemFromDb.setItemUpdator(item.getItemUpdator());
				}
				
			} else {				
				if(file != null) {
					String changeFileName = UUID.randomUUID().toString();
					String imagePath = fileService.storeFile(file, changeFileName);
					itemFromDb.setImagePath(imagePath);
				}
				
				if(item.getItemName() != null) {
					itemFromDb.setItemName(item.getItemName());
				}
				
				if(item.getItemInformation() != null) {
					itemFromDb.setItemInformation(item.getItemInformation());
				}
				
				itemFromDb.setCategoryNo(item.getCategoryNo());
				itemFromDb.setUpdatedAt(dateFormat.format(date));
				itemFromDb.setStock(item.getStock());			
				itemFromDb.setItemPrice(item.getItemPrice());
				itemFromDb.setItemUpdator(item.getItemUpdator());
			}
			
			itemRepository.save(itemFromDb);
		}
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
		List<Item> itemList = itemRepository.findAllByItemNameContainsAndItemNameContainsAndItemNameContains(keyWord1, 
								keyWord2, keyWord3, pageable);
		return itemList;
	}
	
	public long getCountByCategoryNo(int categoryNo) {
		long count = itemRepository.countByCategoryNoAndIsCanceled(categoryNo, "N");
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
		
		long count = itemRepository.countByItemNameContainsAndItemNameContainsAndItemNameContains(keyWord1, keyWord2, keyWord3);
		return count;
	}
	
	public List<Item> getByRegistrar(String registrar, Pagination pagination) {
		Pageable pageable = PageRequest.of(pagination.getCurPage() -1, pagination.getPageSize());
		List<Item> itemList = itemRepository.findAllByRegistrar(registrar, pageable);
		
		return itemList;
	}
	
	public long getCountByRegistrar(String registrar) {
		long count = itemRepository.countByRegistrar(registrar);
		return count;
	}
}
