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
@Table(name = "tb_cart")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CART_NO", nullable = false, updatable = false)
	int cartNo;
	
	@Column(name = "CART_ID", nullable = true, length = 200)
	String cartId;
	
	@Column(name = "ITEM_NO", nullable = false)
	int itemNo;
	
	@Column(name = "COUNT", nullable = false)
	int count;
	
	@Column(name = "MEMBER_ID", nullable = true, length = 20)
	@NotBlank(message = "memberId Field is empty")
	String memberId;
	
	@Column(name = "IS_USING", nullable = false, columnDefinition = "CHAR DEFAULT 'N'", insertable = false)
	String isUsing;

	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;

	public int getCartNo() {
		return cartNo;
	}

	public void setCartNo(int cartNo) {
		this.cartNo = cartNo;
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public int getItemNo() {
		return itemNo;
	}

	public void setItemNo(int itemNo) {
		this.itemNo = itemNo;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getIsUsing() {
		return isUsing;
	}

	public void setIsUsing(String isUsing) {
		this.isUsing = isUsing;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Cart [cartNo=" + cartNo + ", cartId=" + cartId + ", itemNo=" + itemNo + ", count=" + count
				+ ", memberId=" + memberId + ", isUsing=" + isUsing + ", createdAt="
				+ createdAt + "]";
	}

	
}
