package com.market.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.market.service.ItemService;
import com.market.vo.Item;
import com.market.vo.Pagination;
import com.market.vo.RequestEntity;
import com.market.vo.PageWrapper;

@RestController
public class ItemController {
	
	@Autowired
	ItemService itemService;
	
	@GetMapping("/items")
	public ResponseEntity<PageWrapper<Item>> getItems(@RequestParam int categoryNo, @RequestParam int startPage, @RequestParam int pageSize) {
		
		List<Item> itemList = itemService.getByCategoryNo(categoryNo, startPage, pageSize);
		long count = itemService.getTotalCount();
		PageWrapper<Item> item = new PageWrapper<Item>();
		item.setResult(itemList);
		item.setCount(count);
		
		return new ResponseEntity<PageWrapper<Item>>(item ,HttpStatus.OK);
	}

	@PostMapping(path = "/items", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = { MediaType.APPLICATION_JSON_VALUE })
	@Transactional
	public void create(@RequestPart("item") String item, 
					   @RequestPart(value = "file", required = false) MultipartFile file) 
					   throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Item itemVo = null;
		itemVo = objectMapper.readValue(item, Item.class);		
		itemService.save(itemVo, file);		
	}
	
	@PostMapping("/items/search")
	public PageWrapper<Item> search(@RequestBody RequestEntity<Item> request) {
		Item item = request.getRequestData();
		Pagination pagination = request.getPagination();
		return null;
	}
}
