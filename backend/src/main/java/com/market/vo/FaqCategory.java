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
@Table(name = "tb_faq_create")
public class FaqCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FAQ_CATEGORY_NO", nullable = false)
	@NotBlank(message = "faqCategoryNo Field is empty")
	int faqCategoryNo;
	
	@Column(name = "FAQ_CATEGORY_NAME", nullable = false, length = 45)
	@NotBlank(message = "faqCategoryName Field is empty")
	String faqCategoryName;
	
	@Column(name = "CATEGORY_PARENTS", nullable = false)
	@NotBlank(message = "categoryParents Field is empty")
	int categoryParents;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;
	
	@Column(name = "CREATOR_ID", nullable = false, length = 20)
	@NotBlank(message = "creatorId Field is empty")
	String creatorId;

	public int getFaqCategoryNo() {
		return faqCategoryNo;
	}

	public void setFaqCategoryNo(int faqCategoryNo) {
		this.faqCategoryNo = faqCategoryNo;
	}

	public String getFaqCategoryName() {
		return faqCategoryName;
	}

	public void setFaqCategoryName(String faqCategoryName) {
		this.faqCategoryName = faqCategoryName;
	}

	public int getCategoryParents() {
		return categoryParents;
	}

	public void setCategoryParents(int categoryParents) {
		this.categoryParents = categoryParents;
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

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	@Override
	public String toString() {
		return "FaqCategory [faqCategoryNo=" + faqCategoryNo + ", faqCategoryName=" + faqCategoryName
				+ ", categoryParents=" + categoryParents + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ ", creatorId=" + creatorId + "]";
	}
	
	
}
