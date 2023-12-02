package com.playwithcode.businessbridge.sales.domain.repository;

import com.playwithcode.businessbridge.sales.domain.Sales;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface SalesRepository extends JpaRepository<Sales, Long>, JpaSpecificationExecutor<Sales> {
	
    /* 2. 영업 상세 조회 - salesCode로 영업 1개 조회 */
    Optional<Sales> findBySalesCode(Long productCode);
}

/*
*    select * from tbl_sales
*       where sales_code = ${salesCode}
*
* */