package com.playwithcode.businessbridge.product.domain.repository;

import com.playwithcode.businessbridge.product.domain.Estimate;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface EstimateRepository extends JpaRepository<Estimate, Long> {

    //견적서 상태별 목록 조회
    Page<Estimate> findByEstiState(Pageable pageable, EstimateType estimateType);


    //거래처 검색  조회

    Page<Estimate> findByAccountAccountNameContainsAndEstiState(Pageable pageable, String accountName, EstimateType estimateType);





   //담당자 검색  조회
    Page<Estimate> findByAccountAccountManagerContainsAndEstiState(Pageable pageable, String accountManager, EstimateType estimateType);

}
