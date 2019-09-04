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
@Table(name = "tb_faq")
public class Faq {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FAQ_NO", nullable = false)
	@NotBlank(message = "faqNo Field is empty")
	int faqNo;
	
	@Column(name = "CATEGORY_NO", nullable = false)
	@NotBlank(message = "categoryNo Field is empty")
	int categoryNo;
	
	@Column(name = "FAQ_TITLE", nullable = false, length = 100)
	@NotBlank(message = "faqTitle Field is empty")
	String faqTitle;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;
	
	@Column(name = "FAQ_CONTENT", nullable = false, length = 1000)
	@NotBlank(message = "faqContent Field is empty")
	String faqContent;
	
	@Column(name = "CREATOR_ID", nullable = false, length = 20)
	@NotBlank(message = "creatorId Field is empty")
	String creatorId;

	public int getFaqNo() {
		return faqNo;
	}

	public void setFaqNo(int faqNo) {
		this.faqNo = faqNo;
	}

	public int getCategoryNo() {
		return categoryNo;
	}

	public void setCategoryNo(int categoryNo) {
		this.categoryNo = categoryNo;
	}

	public String getFaqTitle() {
		return faqTitle;
	}

	public void setFaqTitle(String faqTitle) {
		this.faqTitle = faqTitle;
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

	public String getFaqContent() {
		return faqContent;
	}

	public void setFaqContent(String faqContent) {
		this.faqContent = faqContent;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	@Override
	public String toString() {
		return "Faq [faqNo=" + faqNo + ", categoryNo=" + categoryNo + ", faqTitle=" + faqTitle + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", faqContent=" + faqContent + ", creatorId=" + creatorId
				+ "]";
	}
	
	
}
