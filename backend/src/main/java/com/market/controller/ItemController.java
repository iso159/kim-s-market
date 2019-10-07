package com.market.controller;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.market.service.ItemService;
import com.market.vo.Item;

@RestController
public class ItemController {
	
	@Autowired
	ItemService itemService;
	
	

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
}
