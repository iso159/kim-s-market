package com.market.vo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "tb_answer")
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ANSWER_NO", nullable = false)
	@NotBlank(message = "answerNo Field is empty")
	int answerNo;

	@Column(name = "INQUIRY_NO", nullable = false)
	@NotBlank(message = "inquiryNo Field is empty")
	int inquiryNo;
	
	@Column(name = "ANSWER_CONTENT", nullable = false, length = 1000)
	@NotBlank(message = "answerContent Field is empty")
	String answerContent;
	
	@Column(name = "ANSWERER", nullable = false, length = 20)
	@NotBlank(message = "answerer Field is empty")
	String answerer;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "ITEM_UPDATOR", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date itemUpdator;

	public int getAnswerNo() {
		return answerNo;
	}

	public void setAnswerNo(int answerNo) {
		this.answerNo = answerNo;
	}

	public int getInquiryNo() {
		return inquiryNo;
	}

	public void setInquiryNo(int inquiryNo) {
		this.inquiryNo = inquiryNo;
	}

	public String getAnswerContent() {
		return answerContent;
	}

	public void setAnswerContent(String answerContent) {
		this.answerContent = answerContent;
	}

	public String getAnswerer() {
		return answerer;
	}

	public void setAnswerer(String answerer) {
		this.answerer = answerer;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getItemUpdator() {
		return itemUpdator;
	}

	public void setItemUpdator(Date itemUpdator) {
		this.itemUpdator = itemUpdator;
	}

	@Override
	public String toString() {
		return "Answer [answerNo=" + answerNo + ", inquiryNo=" + inquiryNo + ", answerContent=" + answerContent
				+ ", answerer=" + answerer + ", createdAt=" + createdAt + ", itemUpdator=" + itemUpdator + "]";
	}
	
	
}
