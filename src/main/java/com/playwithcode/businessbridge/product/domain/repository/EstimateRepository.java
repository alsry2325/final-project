package com.playwithcode.businessbridge.product.domain.repository;

import com.playwithcode.businessbridge.product.domain.Estimate;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EstimateRepository {

    //견적서 상태별 목록 조회
    Page<Estimate> findByEstimateState(Pageable pageable, EstimateType estimateType);



    //거래처, 담당자 검색창에  조회
    //Page<Estimate> findByAccountNameContainsAndEstimateState(Pageable pageable, String accountName, EstimateType estimateType);


    //Page<Estimate> findByAccountManagerContainsAndEstimateState(Pageable pageable, String accountManager, EstimateType estimateType);

}
