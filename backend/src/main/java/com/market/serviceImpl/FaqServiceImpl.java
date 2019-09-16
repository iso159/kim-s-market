package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.FaqRepository;
import com.market.service.CrudService;
import com.market.vo.Faq;

@Service
public class FaqServiceImpl implements CrudService<Faq>  {

	@Autowired
	FaqRepository faqRepository;
	
	@Override
	public Faq getById(String id) {
		Faq findFaq = faqRepository.findById(id).get();
		return findFaq;
	}
	
	@Override
	public List<Faq> get(Faq faq) {
		Example<Faq> exampleFaq = Example.of(faq);
		List<Faq> faqList = faqRepository.findAll(exampleFaq);
		return faqList;
	}
	
	@Override
	public void save(Faq faq) {
		faqRepository.save(faq);
	}
	
	@Override
	public void remove(String id) {
		faqRepository.deleteById(id);
	}
	
	@Override
	public void modify(Faq faq) {
		String id = "1";
		Optional<Faq> findFaq = faqRepository.findById(id);
		if(findFaq.isPresent()) {
			faq = findFaq.get();
			// find 객체 수정후 save
			faq.setFaqContent("FAQ수정내용");
			faqRepository.save(faq);
		}
	}
}
