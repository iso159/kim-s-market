package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.SalesHistoryRepository;
import com.market.service.CrudService;
import com.market.vo.SalesHistory;

@Service
public class SalesHistoryServiceImpl implements CrudService<SalesHistory> {

	@Autowired
	SalesHistoryRepository salesHistoryRepository;
	
	@Override
	public SalesHistory getById(String id) {
		SalesHistory findSalesHistory = salesHistoryRepository.findById(id).get();
		return findSalesHistory;
	}
	
	@Override
	public List<SalesHistory> get(SalesHistory salesHistory) {
		Example<SalesHistory> exampleSalesHistory = Example.of(salesHistory);
		List<SalesHistory> salesHistoryList = salesHistoryRepository.findAll(exampleSalesHistory);
		return salesHistoryList;
	}
	
	@Override
	public void save(SalesHistory salesHistory) {
		salesHistoryRepository.save(salesHistory);
	}
	
	@Override
	public void remove(String id) {
		salesHistoryRepository.deleteById(id);
	}
	
	@Override
	public void modify(SalesHistory salesHistory) {
		String id = "1";
		Optional<SalesHistory> findSalesHistory = salesHistoryRepository.findById(id);
		if(findSalesHistory.isPresent()) {
			salesHistory = findSalesHistory.get();
			// find 객체 수정후 save
			salesHistoryRepository.save(salesHistory);
		}
	}
	
}
