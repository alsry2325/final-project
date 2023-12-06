package com.playwithcode.businessbridge.product.service;


import com.playwithcode.businessbridge.product.domain.Estimate;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.repository.EstimateRepository;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductsResponse;
import com.playwithcode.businessbridge.product.dto.response.EstimateListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.product.domain.type.EstimateType.PROGRESS;
import static com.playwithcode.businessbridge.product.domain.type.ProductStateType.SALES;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EstimateService {

    private final EstimateRepository estimateRepository;



    private Pageable getPageable(final Integer page) {

        return PageRequest.of(page - 1, 10, Sort.by("estimateCode").descending());
    }

   //견적서 진행상황별 조회 
    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateList(final Integer page, final EstimateType estiState) {

        log.info("estiState : {}", estiState);

        Page<Estimate> estimateList = estimateRepository.findByEstiState(getPageable(page), estiState);

        log.info("estimateList : {}", estimateList.getContent());

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));


    }

    //거래처명 검색 조회


    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateAccountName(Integer page, String accountName) {


        Page<Estimate> estimateList = estimateRepository.findByAccountAccountNameContainsAndEstiState(getPageable(page),accountName, PROGRESS);

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));
    }

    //담당자 검색조회

    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateAccountManager(Integer page, String accountManager) {


        Page<Estimate> estimateList = estimateRepository.findByAccountAccountManagerContainsAndEstiState(getPageable(page),accountManager, PROGRESS);

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));


    }



}
