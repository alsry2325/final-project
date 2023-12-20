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
        if ("accountName".equals(schType)) {
            spec = spec.and(SalesSpecification.likeAccountName(schText));
        }
    	
        Page<Sales> salesList = salesRepository.findAll(spec, getPageable(page));

        return salesList.map(sales -> SalesListResponse.from(sales));
    }

    /* 2. 영업 상세 조회 - salesCode로 영업 1개 조회 */
    @Transactional(readOnly = true)
    public SalesDetailResponse getSalesDetail(final Long salesCode) {

    	Sales sales = salesRepository.findById(salesCode).orElseThrow(() -> new NotFoundException(ACCESS_DENIED));

    	return SalesDetailResponse.from(sales);
    }
    
    /* 3. 영업 등록 */
    /* 
     * 	of 메서드는 Sales 객체를 생성하는 데 사용되는 정적 팩토리 메서드이다.
     * 	Sales 클래스의 생성자는 필수 매개변수가 많기 때문에 of 메서드를 사용하면 매개변수를 한 번에 전달할 수 있어 편리하다.
     *  위에서 생성한 of 생성자를 jpa에서 제공하는 save 메서드를 이용하여 저장한다.
     */
    public Long save(final SalesCreateRequest salesCreateRequest, CustomUser customUser) {

    	Employee employee = employeeRepository.findById(customUser.getEmplyCode())
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

        //영업관리 저장
        final Sales sales = salesRepository.save(newSales);
        
        log.info(" sales 저장결과 : {}",sales.toString());

        return sales.getSalesCode();
    }

    /* 4. 영업 수정*/
    /*
     * ※ Entity 객체의 값만 변경하면 별도로 Update문을 작성하지않아도 테이블의 값이 변경된다. 이것이 엔티티파일에 update 메서드가 있는 이유이다.
     * ※ Entity내의 update 메서드에서는 this로 각 컬럼의 값을 변경시킨다.
     *  
     */
    public void update(final Long salesCode, final SalesUpdateRequest salesUpdateRequest) {
	  
    	Sales sales = salesRepository.findById(salesCode)
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
    
    /* 5. 영업 삭제 */
    /* jpa에서 제공하는 delete 메서드를 이용하여 삭제, 메서드에서 Id란 키워드는 프라이머키를 말한다.
     * */
    public void delete(final Long salesCode) {
    	salesRepository.deleteById(salesCode);
    }    
    
    /* 6. 진행내역 등록 */
    public Long progressSave(final ProgressCreateRequest progressCreateRequest, CustomUser customUser) {
    	
    	Sales sales = salesRepository.findById(progressCreateRequest.getSalesCode())
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

    
    /* 7. 상품목록 조회(영업,거래처 등록에서 필요함) */
    @Transactional(readOnly = true)
    public List<SalesProductListResponse> getProductList(){
    	
        List<Product> productList = productRepository.findAll();
        List<SalesProductListResponse> result = productList.stream().map(SalesProductListResponse::from).collect(Collectors.toList());
        return result;
        
    }

    /*8. 영업통계 조회 */
    /* 
     * JPA인터페이스를 사용하지않고 JPQL을 이용하여 쿼리를 직접 작성
     * */
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
