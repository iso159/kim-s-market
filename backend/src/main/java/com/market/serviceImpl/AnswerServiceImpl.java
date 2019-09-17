package com.market.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.market.repository.AnswerRepository;
import com.market.service.CrudService;
import com.market.vo.Answer;

@Service
public class AnswerServiceImpl implements CrudService<Answer> {
	
	@Autowired
	AnswerRepository answerRepository;
	
	@Override
	public Answer getById(String id) {
		Answer findAnswer = answerRepository.findById(id).get();
		return findAnswer;
	}
	
	@Override
	public List<Answer> get(Answer answer) {
		Example<Answer> exampleAnswer = Example.of(answer);
		List<Answer> answerList = answerRepository.findAll(exampleAnswer);
		return answerList;
	}
	
	@Override
	public void save(Answer answer) {
		answerRepository.save(answer);
	}
	
	@Override
	public void remove(String id) {
		answerRepository.deleteById(id);
	}
	
	@Override
	public void modify(Answer answer) {
		String id = "1";
		Optional<Answer> findAnswer = answerRepository.findById(id);
		if(findAnswer.isPresent()) {
			answer = findAnswer.get();
			// find 객체 수정후 save
			answer.setAnswerContent("수정내용");
			answerRepository.save(answer);
		}
	}

}
