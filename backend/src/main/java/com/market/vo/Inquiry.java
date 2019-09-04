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
import javax.validation.constraints.NotNull;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "tb_inquiry")
public class Inquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "INQUIRY_NO", nullable = false)
	@NotBlank(message = "inquiryNo Field is empty")
	int inquiryNo;
	
	@Column(name = "FAQ_CATEGORY_NO", nullable = false)
	@NotBlank(message = "faqCategoryNo Field is empty")
	int faqCategoryNo;
	
	@Column(name = "INQUIRY_CONTENT", nullable = false, length = 1000)
	@NotBlank(message = "inquiryContent Field is empty")
	String inquiryContent;
	
	@Column(name = "INQUIRY_TITLE", nullable = false, length = 100)
	@NotBlank(message = "inquiryTitle Field is empty")
	String inquiryTitle;
	
	@Column(name = "INQUIRER", nullable = false, length = 20)
	@NotBlank(message = "inquirer Field is empty")
	String inquirer;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;
	
	@Column(name = "IS_DELETED", nullable = false, columnDefinition = "CHAR")
	@NotNull(message = "isDeleted Field is empty")
	char isDeleted;

	public int getInquiryNo() {
		return inquiryNo;
	}

	public void setInquiryNo(int inquiryNo) {
		this.inquiryNo = inquiryNo;
	}

	public int getFaqCategoryNo() {
		return faqCategoryNo;
	}

	public void setFaqCategoryNo(int faqCategoryNo) {
		this.faqCategoryNo = faqCategoryNo;
	}

	public String getInquiryContent() {
		return inquiryContent;
	}

	public void setInquiryContent(String inquiryContent) {
		this.inquiryContent = inquiryContent;
	}

	public String getInquiryTitle() {
		return inquiryTitle;
	}

	public void setInquiryTitle(String inquiryTitle) {
		this.inquiryTitle = inquiryTitle;
	}

	public String getInquirer() {
		return inquirer;
	}

	public void setInquirer(String inquirer) {
		this.inquirer = inquirer;
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

	public char getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(char isDeleted) {
		this.isDeleted = isDeleted;
	}

	@Override
	public String toString() {
		return "Inquiry [inquiryNo=" + inquiryNo + ", faqCategoryNo=" + faqCategoryNo + ", inquiryContent="
				+ inquiryContent + ", inquiryTitle=" + inquiryTitle + ", inquirer=" + inquirer + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", isDeleted=" + isDeleted + "]";
	}
	
}

