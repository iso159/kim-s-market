/**
 * Author : KJW
 */
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
@Table(name = "tb_category")
public class Category {
	@Id
	@Column(name = "CATEGORY_NO")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int categoryNo;
	
	@Column(name = "CREATOR_ID", nullable = false, length = 20)
	String creatorId;
	
	@Column(name = "CATEGORY_NAME", nullable = false, length = 45)
	String categoryName;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;
	
	@Column(name = "CATEGORY_PARENTS", nullable = true)
	int categoryParents;

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

	@Override
	public String toString() {
		return "Category [categoryNo=" + categoryNo + ", creatorId=" + creatorId + ", categoryName=" + categoryName
				+ ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", categoryParents=" + categoryParents
				+ "]";
	}

}
