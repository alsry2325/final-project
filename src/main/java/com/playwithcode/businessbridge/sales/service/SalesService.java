package com.playwithcode.businessbridge.sales.service;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import com.playwithcode.businessbridge.address.dto.response.AddressBookResponse;
import com.playwithcode.businessbridge.sales.domain.Sales;
import com.playwithcode.businessbridge.sales.domain.repository.SalesRepository;
import com.playwithcode.businessbridge.sales.dto.response.SalesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SalesService {
    
    private final SalesRepository salesRepository;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page-1,10, Sort.by("productCode").descending());
    }

    /* 1. 영업 목록 조회 : 페이징 */
    @Transactional(readOnly = true)
    public Page<SalesResponse> getAllSales(final Integer page) {
        Page<Sales> sales = SalesRepository.findAll(getPageable(page));

    }

}
