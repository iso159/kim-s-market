package com.market.vo;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "tb_member")
public class Member {

	@Id
	@Column(name = "MEMBER_ID", nullable = false, length = 20)
	@NotBlank(message = "MemberId Field is empty")
	String memberId;
	
	@Column(name = "PASSWORD", nullable = false, length = 200)
	@NotBlank(message = "Password Field is empty")
	String password;
	
	@Column(name = "NAME", nullable = false, length = 20)
	@NotBlank(message = "Name Field is empty")
	String name;
	
	@Column(name = "PHONE", nullable = false, length = 11)
	@NotBlank(message = "Phone Field is empty")
	String phone;
	
	@Column(name = "MAIL", nullable = false, length = 50)
	@NotBlank(message = "Mail Field is empty")
	String mail;
	
	@Column(name = "ZIP_CODE", nullable = false, length = 10)
	@NotBlank(message = "ZipCode Field is empty")
	String zipCode;
	
	@Column(name = "ADDRESS", nullable = false, length = 200)
	@NotBlank(message = "Address Field is empty")
	String address;
	
	@Column(name = "AUTHORITY", nullable = false, columnDefinition = "varchar(10) DEFAULT 'USER'", insertable = false)
	String authority;
	
	@Column(name = "STATUS", nullable = false, columnDefinition = "CHAR DEFAULT 'Y'", insertable = false)
	String status;
	
	@Column(name = "GRANTOR", nullable = true, length = 20)
	String grantor;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;
	
	@Column(name = "UPDATED_AT", nullable = true, columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	Date updatedAt;

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
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

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getGrantor() {
		return grantor;
	}

	public void setGrantor(String grantor) {
		this.grantor = grantor;
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
		return "Member [memberId=" + memberId + ", password=" + password + ", name=" + name + ", phone=" + phone
				+ ", mail=" + mail + ", zipCode=" + zipCode + ", address=" + address + ", authority=" + authority
				+ ", status=" + status + ", grantor=" + grantor + ", createdAt=" + createdAt + ", updatedAt="
				+ updatedAt + "]";
	}
}
