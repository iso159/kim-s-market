package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.SalesHistory;

public interface SalesHistoryRepository extends JpaRepository<SalesHistory, String> {

}
