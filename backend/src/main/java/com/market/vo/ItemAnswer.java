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
@Table(name = "tb_item_answer")
public class ItemAnswer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ITEM_ANSWER_NO", nullable = false)
	@NotBlank(message = "itemAnswerNo Field is empty")
	int itemAnswerNo;
	
	@Column(name = "ITEM_INQUIRY_NO", nullable = false)
	@NotBlank(message = "itemInquiryNo Field is empty")
	int itemInquiryNo;
	
	@Column(name = "CONTENT", nullable = false, length = 1000)
	@NotBlank(message = "content Field is empty")
	String content;
	
	@Column(name = "ANSWERER", nullable = false, length = 20)
	@NotBlank(message = "answerer Field is empty")
	String answerer;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;

	public int getItemAnswerNo() {
		return itemAnswerNo;
	}

	public void setItemAnswerNo(int itemAnswerNo) {
		this.itemAnswerNo = itemAnswerNo;
	}

	public int getItemInquiryNo() {
		return itemInquiryNo;
	}

	public void setItemInquiryNo(int itemInquiryNo) {
		this.itemInquiryNo = itemInquiryNo;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "ItemAnswer [itemAnswerNo=" + itemAnswerNo + ", itemInquiryNo=" + itemInquiryNo + ", content=" + content
				+ ", answerer=" + answerer + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}
	
	
}
