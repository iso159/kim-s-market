package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.NoticeRepository;
import com.market.service.CrudService;
import com.market.vo.Notice;

@Service
public class NoticeServiceImpl implements CrudService<Notice> {
	
	@Autowired
	NoticeRepository noticeRepository;
	
	@Override
	public Notice getById(String id) {
		Notice findNotice = noticeRepository.findById(id).get();
		return findNotice;
	}
	
	@Override
	public List<Notice> get(Notice notice) {
		Example<Notice> exampleNotice = Example.of(notice);
		List<Notice> noticeList = noticeRepository.findAll(exampleNotice);
		return noticeList;
	}
	
	@Override
	public void save(Notice notice) {
		noticeRepository.save(notice);
	}
	
	@Override
	public void remove(String id) {
		noticeRepository.deleteById(id);
	}
	
	@Override
	public void modify(Notice notice) {
		String id = "1";
		Optional<Notice> findNotice = noticeRepository.findById(id);
		if(findNotice.isPresent()) {
			notice = findNotice.get();
			// find 객체 수정후 save
			notice.setNoticeTitle("공지사항제목 변경");
			notice.setNoticeContent("공지사항 내용변경");
			noticeRepository.save(notice);
		}
	}

}
