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
@Table(name = "tb_delivery_location")
public class DeliveryLocation {
	
	@Id
	@Column(name = "no")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "location", nullable = false)
	private String location;
	
	@Column(name = "contact", nullable = false)
	private String contact;
	
	@Column(name = "member_id", nullable = false)
	private String memberId;
	
	@Column(name = "created_at", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdAt;

	public int getNo() {
		return no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "DeliveryLocation [no=" + no + ", name=" + name + ", location=" + location + ", contact=" + contact
				+ ", memberId=" + memberId + ", createdAt=" + createdAt + "]";
	}
	
}
