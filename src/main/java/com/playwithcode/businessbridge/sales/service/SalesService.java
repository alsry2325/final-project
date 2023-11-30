package com.playwithcode.businessbridge.sales.service;


import com.playwithcode.businessbridge.sales.domain.Sales;
import com.playwithcode.businessbridge.sales.domain.SalesSpecification;
import com.playwithcode.businessbridge.sales.domain.repository.SalesRepository;
import com.playwithcode.businessbridge.sales.dto.response.SalesListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SalesService {

    private final SalesRepository salesRepository;

    //private final ProgressRepository progressRepository;


    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page-1,10, Sort.by("salesCode").descending());
    }

    /* 1. 영업 목록 조회 - 진행도,검색키워드,페이징 */
    @Transactional(readOnly = true)
    public Page<SalesListResponse> getFindAll(final Integer page, String salesStatus, String schType, String schText) {

        //jpa 유연하게 검색쿼리 만들기 (Specification 사용) https://dev-setung.tistory.com/20 참고함
        Specification<Sales> spec = (root, query, criteriaBuilder) -> null;

        if("전체".equals(salesStatus)){
            salesStatus = "";
        }

        //진행도기준 검색
        if(salesStatus != "" && salesStatus != null) {
            spec = spec.and(SalesSpecification.equalSalesStatus(salesStatus));
        }

        //검색타입이 영업이름일때
        if ("salesName".equals(schType)) {
            spec = spec.and(SalesSpecification.likeSalesName(schText));
        }
        //검색타입이 거래처명일때
        if ("accountName".equals(schType)) {
            spec = spec.and(SalesSpecification.likeAccountName(schText));
        }

        Page<Sales> salesList = salesRepository.findAll(spec, getPageable(page));

        return salesList.map(sales -> SalesListResponse.from(sales));
    }
}
