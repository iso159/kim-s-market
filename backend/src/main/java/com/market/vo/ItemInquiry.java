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
@Table(name = "tb_item_inquiry")
public class ItemInquiry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ITEM_INQUIRY_NO", nullable = false)
	@NotBlank(message = "itemInquiryNo Field is empty")
	int itemInquiryNo;
	
	@Column(name = "ITEM_NO", nullable = false)
	@NotBlank(message = "itemNo Field is empty")
	int itemNo;
	
	@Column(name = "TITLE", nullable = false, length = 200)
	@NotBlank(message = "title Field is empty")
	String title;
	
	@Column(name = "CONTENT", nullable = false, length = 200)
	@NotBlank(message = "content Field is empty")
	String content;
	
	@Column(name = "INQUIRER", nullable = false, length = 20)
	@NotBlank(message = "inquirer Field is empty")
	String inquirer;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "IS_SECRET", nullable = false, columnDefinition = "CHAR")
	@NotNull(message = "isSecret Field is empty")
	char isSecret;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;
	
	@Column(name = "IS_DELETED", nullable = false, columnDefinition = "CHAR")
	@NotNull(message = "isDeleted Field is empty")
	char isDeleted;

	public int getItemInquiryNo() {
		return itemInquiryNo;
	}

	public void setItemInquiryNo(int itemInquiryNo) {
		this.itemInquiryNo = itemInquiryNo;
	}

	public int getItemNo() {
		return itemNo;
	}

	public void setItemNo(int itemNo) {
		this.itemNo = itemNo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	public char getIsSecret() {
		return isSecret;
	}

	public void setIsSecret(char isSecret) {
		this.isSecret = isSecret;
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
		return "ItemInquiry [itemInquiryNo=" + itemInquiryNo + ", itemNo=" + itemNo + ", title=" + title + ", content="
				+ content + ", inquirer=" + inquirer + ", createdAt=" + createdAt + ", isSecret=" + isSecret
				+ ", updatedAt=" + updatedAt + ", isDeleted=" + isDeleted + "]";
	}
	
	
}
