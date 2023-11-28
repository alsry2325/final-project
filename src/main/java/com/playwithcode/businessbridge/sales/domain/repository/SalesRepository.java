package com.playwithcode.businessbridge.sales.domain.repository;

import com.playwithcode.businessbridge.sales.domain.Sales;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;

public interface SalesRepository extends JpaRepository<Sales, Long> {

    /* 1. 영업 목록 전체 조회 */
    Page<Sales> findAll(Pageable pageable);
}
