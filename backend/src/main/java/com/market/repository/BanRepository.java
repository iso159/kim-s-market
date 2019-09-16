package com.market.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.market.vo.Ban;

public interface BanRepository extends JpaRepository<Ban, String> {

}
