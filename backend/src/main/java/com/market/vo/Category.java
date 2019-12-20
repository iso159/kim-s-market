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

@Entity
@Table(name = "tb_category")
public class Category {
	@Id
	@Column(name = "CATEGORY_NO")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int categoryNo;
	
	@Column(name = "CREATOR_ID", nullable = false, length = 20)
	private String creatorId;
	
	@Column(name = "CATEGORY_NAME", nullable = false, length = 45)
	private String categoryName;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updatedAt;
	
	@Column(name = "CATEGORY_PARENTS", nullable = true)
	private int categoryParents;
	
	@Column(name = "HAS_CATEGORIES", nullable = false)
	private String hasSubCategories;

	public int getCategoryNo() {
		return categoryNo;
	}

	public void setCategoryNo(int categoryNo) {
		this.categoryNo = categoryNo;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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

	public int getCategoryParents() {
		return categoryParents;
	}

	public void setCategoryParents(int categoryParents) {
		this.categoryParents = categoryParents;
	}
	
	public String getHasSubCategories() {
		return hasSubCategories;
	}

	public void setHasSubCategories(String hasSubCategories) {
		this.hasSubCategories = hasSubCategories;
	}

	@Override
	public String toString() {
		return "Category [categoryNo=" + categoryNo + ", creatorId=" + creatorId + ", categoryName=" + categoryName
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", categoryParents=" + categoryParents
				+ "]";
	}

}
