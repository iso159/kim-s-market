package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.BanRepository;
import com.market.service.CrudService;
import com.market.vo.Ban;

@Service
public class BanServiceImpl implements CrudService<Ban> {

	@Autowired
	BanRepository banRepository;
	
	@Override
	public Ban getById(String id) {
		Ban findBan = banRepository.findById(id).get();
		return findBan;
	}
	
	@Override
	public List<Ban> get(Ban ban) {
		Example<Ban> exampleBan = Example.of(ban);
		List<Ban> banList = banRepository.findAll(exampleBan);
		return banList;
	}
	
	@Override
	public void save(Ban ban) {
		banRepository.save(ban);
	}
	
	@Override
	public void remove(String id) {
		banRepository.deleteById(id);
	}
	
	@Override
	public void modify(Ban ban) {
		String id = "1";
		Optional<Ban> findBan = banRepository.findById(id);
		if(findBan.isPresent()) {
			ban = findBan.get();
			// find 객체 수정후 save
			ban.setReason("벤사유 수정");
			banRepository.save(ban);
		}
	}
}
