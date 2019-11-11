package com.market.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.repository.BanRepository;
import com.market.vo.Ban;

@Service
public class BanService {
	
	@Autowired
	private BanRepository banRepository;
	
	// 회원 밴 하기
	public void banMember(Ban ban) {
		banRepository.save(ban);
	}
	
}
