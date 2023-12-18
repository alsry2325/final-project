package com.playwithcode.businessbridge.account.service;


import com.playwithcode.businessbridge.account.domain.Account;
import com.playwithcode.businessbridge.account.domain.AccountSpecification;
import com.playwithcode.businessbridge.account.domain.repository.AccountRepository;
import com.playwithcode.businessbridge.account.dto.request.AccountCreateRequest;
import com.playwithcode.businessbridge.account.dto.request.AccountUpdateRequest;
import com.playwithcode.businessbridge.account.dto.response.AccountDetailesponse;
import com.playwithcode.businessbridge.account.dto.response.AccountListResponse;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.repository.ProductRepository;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;

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

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;
    
    private final EmployeeRepository employeeRepository;
    
    private final ProductRepository productRepository;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page-1,10, Sort.by("accountCode").descending());
    }

    /* 1. 영업 목록 조회 - 진행도,검색키워드,페이징 */
    @Transactional(readOnly = true)
    public Page<AccountListResponse> getFindAll(final Integer page, Integer departmentCode, String schType, String schText) {
    	
        //jpa 유연하게 검색쿼리 만들기 (Specification 사용) https://dev-setung.tistory.com/20 참고함
        Specification<Account> spec = (root, query, criteriaBuilder) -> null;
        
        //부서코드가 0이 아니면 부서검색가능, 0이면 부서 전체검색
        if(departmentCode != 0) {
        	spec = spec.and(AccountSpecification.equalDepartmentCode(departmentCode));
        }
        //검색타입이 대표자이름일때
        if ("customerRepresentative".equals(schType)) {
            spec = spec.and(AccountSpecification.likeCustomerRepresentative(schText));
        }
        //검색타입이 거래처명일때
        if ("accountName".equals(schType)) {
            spec = spec.and(AccountSpecification.likeAccountName(schText));
        }
        
        Page<Account> accountList = accountRepository.findAll(spec, getPageable(page));

        return accountList.map(account -> AccountListResponse.from(account));
    }

    /* 2. 거래처 상세 조회 - accountCode로 거래처 1개 조회 */
    @Transactional(readOnly = true)
    public AccountDetailesponse getAccountDetail(final Long accountCode) {

    	Account account = accountRepository.findById(accountCode).orElseThrow(() -> new NotFoundException(ACCESS_DENIED));

    	return AccountDetailesponse.from(account);
    }
    
    /* 4. 거래처 등록 */
    public Long save(final AccountCreateRequest accountCreateRequest, CustomUser customUser) {
    	
    	Long memberCode = (long) 1;
    	Employee employee = employeeRepository.findById(memberCode)
        .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));

        Product product = productRepository.findByProductCodeAndProductState(accountCreateRequest.getProductCode() , ProductStateType.SALES)
                .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));
    	
        final Account newAccount = Account.of(
    		accountCreateRequest.getCustomerRepresentative()
    		,accountCreateRequest.getAccountNumber()
    		,accountCreateRequest.getAccountName()
    		,accountCreateRequest.getTaxInvoiceMail()
    		,accountCreateRequest.getBusinessLicenseNumber()
    		,accountCreateRequest.getAccountAddress()
    		,accountCreateRequest.getSpecialNote()
    		,accountCreateRequest.getAccountManager()
    		,accountCreateRequest.getEstablishedYear()
    		, employee
    		, product
        );

        //1. 거래처 저장
        final Account account = accountRepository.save(newAccount);
        
        log.info(" account 저장결과 : {}",account.toString());
       
        return account.getAccountCode();
    }

    /* 5. 거래처 수정*/
    public void update(final Long accountCode, final AccountUpdateRequest accountUpdateRequest) {
	  
    	Account account = accountRepository.findById(accountCode)
              .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));

        Product product = productRepository.findByProductCodeAndProductState(accountUpdateRequest.getProductCode() , ProductStateType.SALES)
                .orElseThrow(() -> new NotFoundException(ACCESS_DENIED));
    	
    	/* entity 정보 변경 */
    	account.update(
			accountUpdateRequest.getCustomerRepresentative()
			, accountUpdateRequest.getAccountNumber()
			, accountUpdateRequest.getAccountName()
			, accountUpdateRequest.getTaxInvoiceMail()
			, accountUpdateRequest.getBusinessLicenseNumber()
			, accountUpdateRequest.getAccountAddress()
			, accountUpdateRequest.getSpecialNote()
			, accountUpdateRequest.getAccountManager()
			, accountUpdateRequest.getEstablishedYear()
			, product
		);
        
    }
    
    /* 6. 거래처 삭제 */
    public void delete(final Long accountCode) {
    	accountRepository.deleteById(accountCode);
    }    
}
