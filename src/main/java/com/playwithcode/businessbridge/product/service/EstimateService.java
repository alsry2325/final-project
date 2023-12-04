package com.playwithcode.businessbridge.product.service;


import com.playwithcode.businessbridge.product.domain.Estimate;
import com.playwithcode.businessbridge.product.domain.repository.EstimateRepository;
import com.playwithcode.businessbridge.product.dto.response.EstimateListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.product.domain.type.EstimateType.PROGRESS;

@Service
@Transactional
@RequiredArgsConstructor
public class EstimateService {

    private final EstimateRepository estimateRepository;



    private Pageable getPageable(final Integer page) {

        return PageRequest.of(page - 1, 10, Sort.by("productCode").descending());
    }

   //견적서 진행상황별 조회 
    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateList(final Integer page) {

        Page<Estimate> estimateList = estimateRepository.findByEstimateState(getPageable(page), PROGRESS);

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));


    }


}
