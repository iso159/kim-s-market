package com.market.vo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "tb_item", indexes = {@Index(columnList = "CATEGORY_NO")})
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ITEM_NO", nullable = false, updatable = false)
	int itemNo;
	
	@Column(name = "CATEGORY_NO", nullable = false)
	int categoryNo;
	
	@Column(name = "ITEM_NAME", nullable = false, length = 45)
	@NotBlank(message = "itemName Field is empty")
	String itemName;
	
	@Column(name = "ITEM_PRICE", nullable = false)
	int itemPrice;
	
	@Column(name = "ITEM_INFORMATION", nullable = false, length = 500)
	@NotBlank(message = "itemInformation Field is empty")
	String itemInformation;
	
	@Column(name = "STOCK", nullable = false)
	int stock;
	
	@Column(name = "IMAGE_PATH", nullable = true, length = 500)
	String imagePath;
	
	@Column(name = "IS_CANCELED", nullable = false, columnDefinition = "CHAR DEFAULT 'N'", insertable = false)
	String isCanceled;
	
	@Column(name = "REGISTRAR", nullable = false, length = 20)
	@NotBlank(message = "registrar Field is empty")
	String registrar;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "ITEM_UPDATOR", nullable = true, length = 20)
	String itemUpdator;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	String updatedAt;
	
	@Column(name = "ITEM_DELETOR", nullable = true, length = 20)
	String itemDeletor;
	
	@Column(name = "DELETED_AT", nullable = true, columnDefinition = "DATETIME")
	String deletedAt;

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

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
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

	public String getUpdatedAt() {
		return updatedAt;
	}

	public String getItemDeletor() {
		return itemDeletor;
	}

	public void setItemDeletor(String itemDeletor) {
		this.itemDeletor = itemDeletor;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getDeletedAt() {
		return deletedAt;
	}

	public void setDeletedAt(String deletedAt) {
		this.deletedAt = deletedAt;
	}

	@Override
	public String toString() {
		return "Item [itemNo=" + itemNo + ", categoryNo=" + categoryNo + ", itemName=" + itemName + ", itemPrice="
				+ itemPrice + ", itemInformation=" + itemInformation + ", stock=" + stock + ", imagePath=" + imagePath
				+ ", isCanceled=" + isCanceled + ", registrar=" + registrar + ", createdAt=" + createdAt
				+ ", itemUpdator=" + itemUpdator + ", updatedAt=" + updatedAt + ", itemDeletor=" + itemDeletor
				+ ", deletedAt=" + deletedAt + "]";
	}
}
