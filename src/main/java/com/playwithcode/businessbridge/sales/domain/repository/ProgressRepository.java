package com.playwithcode.businessbridge.sales.domain.repository;

import com.playwithcode.businessbridge.sales.domain.Progress;
import com.playwithcode.businessbridge.sales.domain.Sales;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ProgressRepository extends JpaRepository<Progress, Long>, JpaSpecificationExecutor<Sales> {
	
}
