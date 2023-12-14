package com.playwithcode.businessbridge.sales.service;

import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.repository.ProductRepository;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import com.playwithcode.businessbridge.sales.domain.Progress;
import com.playwithcode.businessbridge.sales.domain.Sales;
import com.playwithcode.businessbridge.sales.domain.SalesSpecification;
import com.playwithcode.businessbridge.sales.domain.repository.ProgressRepository;
import com.playwithcode.businessbridge.sales.domain.repository.SalesRepository;
import com.playwithcode.businessbridge.sales.dto.request.ProgressCreateRequest;
import com.playwithcode.businessbridge.sales.dto.request.SalesCreateRequest;
import com.playwithcode.businessbridge.sales.dto.request.SalesUpdateRequest;
import com.playwithcode.businessbridge.sales.dto.response.SalesDetailResponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesListResponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesProductListResponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesStatisticsListResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.ACCESS_DENIED;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SalesService {

    private final SalesRepository salesRepository;

    private final EmployeeRepository employeeRepository;

    private final ProgressRepository progressRepository;

    private final ProductRepository productRepository;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page-1,10, Sort.by("salesCode").descending());
    }

    /* 1. 영업 목록 조회 - 진행도,검색키워드,페이징 */
    @Transactional(readOnly = true)
    public Page<SalesListResponse> getSalesList(final Integer page, String salesStatus, String schType, String schText) {

    	//jpa 유연하게 검색쿼리 만들기 (Specification 사용) https://dev-setung.tistory.com/20
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
        if ("accountName    ".equals(schType)) {
            spec = spec.and(SalesSpecification.likeAccountName(schText));
        }
    	
        Page<Sales> salesList = salesRepository.findAll(spec, getPageable(page));

        return salesList.map(sales -> SalesListResponse.from(sales));
    }

    /* 2. 영업 상세 조회 - salesCode로 영업 1개 조회 */
    @Transactional(readOnly = true)
    public SalesDetailResponse getSalesDetail(final Long salesCode) {

    	Sales sales = salesRepository.findBySalesCode(salesCode).orElseThrow(() -> new NotFoundException(ACCESS_DENIED));

    	return SalesDetailResponse.from(sales);
    }
    
    /* 4. 영업 등록 */
    public Long save(final SalesCreateRequest salesCreateRequest, CustomUser customUser) {
    	
    	Long memberCode = (long) 1;
    	Employee employee = employeeRepository.findById(memberCode)
        .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));

        Product product = productRepository.findByProductCodeAndProductState(salesCreateRequest.getProductCode() , ProductStateType.SALES)
                .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));
        
        final Sales newSales = Sales.of(
    		salesCreateRequest.getSalesName()
    		, salesCreateRequest.getSalesType()
    		, salesCreateRequest.getAccountName()
    		, salesCreateRequest.getSalesWay()
    		, salesCreateRequest.getSalesStatus()
    		, salesCreateRequest.getCustomerRating()
    		, employee
    		, product
        );

        //1. 영업관리 저장
        final Sales sales = salesRepository.save(newSales);
        
        log.info(" sales 저장결과 : {}",sales.toString());

        return sales.getSalesCode();
    }

    /* 5. 영업 수정*/
    public void update(final Long salesCode, final SalesUpdateRequest salesUpdateRequest) {
	  
    	Sales sales = salesRepository.findBySalesCode(salesCode)
              .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));
    	
        Product product = productRepository.findByProductCodeAndProductState(salesUpdateRequest.getProductCode() , ProductStateType.SALES)
                .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));
    	
    	/* entity 정보 변경 */
    	sales.update(
			salesUpdateRequest.getSalesName()
			, salesUpdateRequest.getSalesType()
			, salesUpdateRequest.getSalesWay()
			, salesUpdateRequest.getAccountName()
			, salesUpdateRequest.getCustomerRating()
			, salesUpdateRequest.getSalesStatus()
			, product
		);
    }
    
    /* 6. 영업 삭제 */
    public void delete(final Long salesCode) {
    	salesRepository.deleteById(salesCode);
    }    
    
    /* 7. 진행내역 등록 */
    public Long progressSave(final ProgressCreateRequest progressCreateRequest, CustomUser customUser) {
    	
    	Sales sales = salesRepository.findBySalesCode(progressCreateRequest.getSalesCode())
        .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));
    	

        final Progress newProgress = Progress.of(
    		sales
    		, progressCreateRequest.getState()
    		, progressCreateRequest.getLatestDateConsultation()
    		, progressCreateRequest.getNextDayConsultation()
        );

        //진행내역 저장
        final Progress progress = progressRepository.save(newProgress);
        
        return progress.getProgressCode();
        
    }
    
    @Transactional(readOnly = true)
    public List<SalesProductListResponse> getProductList(){
    	
        List<Product> productList = productRepository.findAll();
        List<SalesProductListResponse> result = productList.stream()
                .map(SalesProductListResponse::from)
                .collect(Collectors.toList());
        return result;
        
    }

    /* 영업통계 조회 */
    @Transactional(readOnly = true)
    public List<SalesStatisticsListResponse> getSalesStatistics(String schMonth) {
    	
    	//검색 월이 있으면 출력
    	if("all".equals(schMonth)) {
    		//전체 조회
    		return salesRepository.salesStatisticsWithJPQL();
    	}else {
    		return salesRepository.salesStatisticsfindByMonthWithJPQL(schMonth);
    	}
    }

}
