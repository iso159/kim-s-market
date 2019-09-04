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
@Table(name = "tb_sales_history")
public class SalesHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SALES_HISTORY_NO", nullable = false)
	@NotBlank(message = "salesHistoryNo Field is empty")
	int salesHistoryNo;
	
	@Column(name = "ITEM_NO", nullable = false)
	@NotBlank(message = "itemNo Field is empty")
	int itemNo;
	
	@Column(name = "COUNT", nullable = false)
	@NotBlank(message = "count Field is empty")
	int count;
	
	@Column(name = "SALES_DATE", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date salesDate;
	
	@Column(name = "BUYER_ID", nullable = false, length = 20)
	@NotBlank(message = "buyerId Field is empty")
	String buyerId;

	public int getSalesHistoryNo() {
		return salesHistoryNo;
	}

	public void setSalesHistoryNo(int salesHistoryNo) {
		this.salesHistoryNo = salesHistoryNo;
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

	public Date getSalesDate() {
		return salesDate;
	}

	public void setSalesDate(Date salesDate) {
		this.salesDate = salesDate;
	}

	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Override
	public String toString() {
		return "SalesHistory [salesHistoryNo=" + salesHistoryNo + ", itemNo=" + itemNo + ", count=" + count
				+ ", salesDate=" + salesDate + ", buyerId=" + buyerId + "]";
	}
	
	
}
