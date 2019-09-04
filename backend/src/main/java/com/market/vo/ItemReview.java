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
@Table(name = "tb_item_review")
public class ItemReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REVIEW_NO", nullable = false)
	@NotBlank(message = "reviewNo Field is empty")
	int reviewNo;
	
	@Column(name = "ITEM_NO", nullable = false)
	@NotBlank(message = "itemNo Field is empty")
	int itemNo;
	
	@Column(name = "STAR_POINT", nullable = false, length = 45)
	@NotBlank(message = "starPoint Field is empty")
	String starPoint;
	
	@Column(name = "CONTENT", nullable = false, length = 45)
	@NotBlank(message = "content Field is empty")
	String content;
	
	@Column(name = "BUYER_ID", nullable = false, length = 20)
	@NotBlank(message = "buyerId Field is empty")
	String buyerId;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;

	public int getReviewNo() {
		return reviewNo;
	}

	public void setReviewNo(int reviewNo) {
		this.reviewNo = reviewNo;
	}

	public int getItemNo() {
		return itemNo;
	}

	public void setItemNo(int itemNo) {
		this.itemNo = itemNo;
	}

	public String getStarPoint() {
		return starPoint;
	}

	public void setStarPoint(String starPoint) {
		this.starPoint = starPoint;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
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
		return "ItemReview [reviewNo=" + reviewNo + ", itemNo=" + itemNo + ", starPoint=" + starPoint + ", content="
				+ content + ", buyerId=" + buyerId + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
	}
	
	
}
