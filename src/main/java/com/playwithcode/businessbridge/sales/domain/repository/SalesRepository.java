package com.playwithcode.businessbridge.sales.domain.repository;

import com.playwithcode.businessbridge.sales.domain.Sales;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface SalesRepository extends JpaRepository<Sales, Long>, JpaSpecificationExecutor<Sales> {
}
