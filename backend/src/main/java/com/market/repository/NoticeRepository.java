package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Notice;

public interface NoticeRepository extends JpaRepository<Notice, String>{

}
