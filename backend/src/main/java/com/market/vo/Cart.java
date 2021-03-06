package com.market.vo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	private int cartNo;
	
	@Column(name = "CART_ID", nullable = true, length = 200)
	private String cartId;
	
	@Column(name = "ITEM_NO", nullable = false)
	private int itemNo;
	
	@Column(name = "COUNT", nullable = false)
	private int count;
	
	@Column(name = "MEMBER_ID", nullable = true, length = 20)
	@NotBlank(message = "memberId Field is empty")
	private String memberId;
	
	@Column(name = "IS_USING", nullable = false, columnDefinition = "CHAR DEFAULT 'N'", insertable = false)
	private String isUsing;

	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	private String updatedAt;
	
	@ManyToOne(targetEntity = Item.class, fetch = FetchType.EAGER)
	@JoinColumn(name="ITEM_NO", referencedColumnName = "ITEM_NO", insertable = false, updatable = false)
	private Item item;

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

	public String getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	@Override
	public String toString() {
		return "Cart [cartNo=" + cartNo + ", cartId=" + cartId + ", itemNo=" + itemNo + ", count=" + count
				+ ", memberId=" + memberId + ", isUsing=" + isUsing + ", createdAt=" + createdAt + ", updatedAt="
				+ updatedAt + ", item=" + item + "]";
	}
}
