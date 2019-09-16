package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.InquiryRepository;
import com.market.service.CrudService;
import com.market.vo.Inquiry;

@Service
public class InquiryServiceImpl implements CrudService<Inquiry> {
	
	@Autowired
	InquiryRepository inquiryRepository;
	
	@Override
	public Inquiry getById(String id) {
		Inquiry findInquiry = inquiryRepository.findById(id).get();
		return findInquiry;
	}
	
	@Override
	public List<Inquiry> get(Inquiry inquiry) {
		Example<Inquiry> exampleInquiry = Example.of(inquiry);
		List<Inquiry> inquiryList = inquiryRepository.findAll(exampleInquiry);
		return inquiryList;
	}
	
	@Override
	public void save(Inquiry inquiry) {
		inquiryRepository.save(inquiry);
	}
	
	@Override
	public void remove(String id) {
		inquiryRepository.deleteById(id);
	}
	
	@Override
	public void modify(Inquiry inquiry) {
		String id = "1";
		Optional<Inquiry> findInquiry = inquiryRepository.findById(id);
		if(findInquiry.isPresent()) {
			inquiry = findInquiry.get();
			// find 객체 수정후 save
			inquiry.setInquiryContent("문의 내용");
			inquiry.setInquiryTitle("문의 제목");
			inquiryRepository.save(inquiry);
		}
	}
}
