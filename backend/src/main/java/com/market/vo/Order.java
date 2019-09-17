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
@Table(name = "tb_order")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ORDER_NO", nullable = false)
	@NotBlank(message = "orderNo Field is empty")
	int orderNo;
	
	@Column(name = "CART_NO", nullable = false)
	@NotBlank(message = "cartNo Field is empty")
	int cartNo;
	
	@Column(name = "BUYER_ID", nullable = false, length = 20)
	@NotBlank(message = "buyerId Field is empty")
	String buyerId;
	
	@Column(name = "ZIP_CODE", nullable = false, length = 10)
	@NotBlank(message = "zipCode Field is empty")
	String zipCode;
	
	@Column(name = "ADDRESS", nullable = false, length = 200)
	@NotBlank(message = "address Field is empty")
	String address;
	
	@Column(name = "PHONE", nullable = false, length = 11)
	@NotBlank(message = "phone Field is empty")
	String phone;
	
	@Column(name = "ORDER_STATUS", nullable = false, length = 10)
	@NotBlank(message = "orderStatus Field is empty")
	String orderStatus;
	
	@Column(name = "ORDER_DATE", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date orderDate;
	
	@Column(name = "CANCEL_DATE", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date cancelDate;
	
	@Column(name = "TOTAL_PRICE", nullable = false)
	@NotBlank(message = "totalPrice Field is empty")
	int totalPrice;

	public int getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(int orderNo) {
		this.orderNo = orderNo;
	}

	public int getCartNo() {
		return cartNo;
	}

	public void setCartNo(int cartNo) {
		this.cartNo = cartNo;
	}

	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getCancelDate() {
		return cancelDate;
	}

	public void setCancelDate(Date cancelDate) {
		this.cancelDate = cancelDate;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Override
	public String toString() {
		return "Order [orderNo=" + orderNo + ", cartNo=" + cartNo + ", buyerId=" + buyerId + ", zipCode=" + zipCode
				+ ", address=" + address + ", phone=" + phone + ", orderStatus=" + orderStatus + ", orderDate="
				+ orderDate + ", cancelDate=" + cancelDate + ", totalPrice=" + totalPrice + "]";
	}
	
	
}
