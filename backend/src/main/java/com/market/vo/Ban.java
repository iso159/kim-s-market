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
@Table(name = "tb_ban")
public class Ban {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BAN_NO", nullable = false)
	@NotBlank(message = "banNo Field is empty")
	int banNo;
	
	@Column(name = "MEMBER_ID", nullable = false, length = 20)
	@NotBlank(message = "memberId Field is empty")
	String memberId;
	
	@Column(name = "REASON", nullable = false, length = 20)
	@NotBlank(message = "reason Field is empty")
	String reason;
	
	@Column(name = "CREATED_AT", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", insertable = false)
	@Temporal(TemporalType.TIMESTAMP)
	Date createdAt;

	public int getBanNo() {
		return banNo;
	}

	public void setBanNo(int banNo) {
		this.banNo = banNo;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Ban [banNo=" + banNo + ", memberId=" + memberId + ", reason=" + reason + ", createdAt=" + createdAt
				+ "]";
	}
	
	
}
