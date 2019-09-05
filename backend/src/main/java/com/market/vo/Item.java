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
@Table(name = "tb_item")
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ITEM_NO", nullable = false)
	@NotBlank(message = "itemNo Field is empty")
	int itemNo;
	
	@Column(name = "CATEGORY_NO", nullable = false)
	@NotBlank(message = "categoryNo Field is empty")
	int categoryNo;
	
	@Column(name = "ITEM_NAME", nullable = false, length = 45)
	@NotBlank(message = "itemName Field is empty")
	String itemName;
	
	@Column(name = "ITEM_PRICE", nullable = false)
	@NotBlank(message = "itemPrice Field is empty")
	int itemPrice;
	
	@Column(name = "ITEM_INFORMATION", nullable = false, length = 500)
	@NotBlank(message = "itemInformation Field is empty")
	String itemInformation;
	
	@Column(name = "STOCK", nullable = false)
	@NotBlank(message = "stock Field is empty")
	int stock;
	
	@Column(name = "IS_CANCELED", nullable = false, columnDefinition = "CHAR DEFAULT 'N'", insertable = false)
	String isCanceled;
	
	@Column(name = "REGISTRAR", nullable = false, length = 20)
	@NotBlank(message = "registrar Field is empty")
	String registrar;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "ITEM_UPDATOR", nullable = true, length = 20)
	@NotBlank(message = "itemUpdator Field is empty")
	String itemUpdator;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;
	
	@Column(name = "DELETED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date deletedAt;

	public int getItemNo() {
		return itemNo;
	}

	public void setItemNo(int itemNo) {
		this.itemNo = itemNo;
	}

	public int getCategoryNo() {
		return categoryNo;
	}

	public void setCategoryNo(int categoryNo) {
		this.categoryNo = categoryNo;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(int itemPrice) {
		this.itemPrice = itemPrice;
	}

	public String getItemInformation() {
		return itemInformation;
	}

	public void setItemInformation(String itemInformation) {
		this.itemInformation = itemInformation;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getIsCanceled() {
		return isCanceled;
	}

	public void setIsCanceled(String isCanceled) {
		this.isCanceled = isCanceled;
	}

	public String getRegistrar() {
		return registrar;
	}

	public void setRegistrar(String registrar) {
		this.registrar = registrar;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getItemUpdator() {
		return itemUpdator;
	}

	public void setItemUpdator(String itemUpdator) {
		this.itemUpdator = itemUpdator;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Date getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(Date deletedAt) {
		this.deletedAt = deletedAt;
	}

	@Override
	public String toString() {
		return "Item [itemNo=" + itemNo + ", categoryNo=" + categoryNo + ", itemName=" + itemName + ", itemPrice="
				+ itemPrice + ", itemInformation=" + itemInformation + ", stock=" + stock + ", isCanceled=" + isCanceled
				+ ", registrar=" + registrar + ", createdAt=" + createdAt + ", itemUpdator=" + itemUpdator
				+ ", updatedAt=" + updatedAt + ", deletedAt=" + deletedAt + "]";
	}
	
	
}
