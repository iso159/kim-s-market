package com.market.vo;


import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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
	
	@Column(name = "AUTHORITY", nullable = false, length = 10)
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
	
	@Column(name = "REASON_TO_BAN", nullable = true)
	String reasonToBan;
	

	@Override
	public String toString() {
		return "Member [memberId=" + memberId + ", password=" + password + ", name=" + name + ", phone=" + phone
				+ ", mail=" + mail + ", zipCode=" + zipCode + ", address=" + address + ", authority=" + authority
				+ ", status=" + status + ", grantor=" + grantor + ", createdAt=" + createdAt + ", updatedAt="
				+ updatedAt + ", reasonToBan=" + reasonToBan + "]";
	}
}
